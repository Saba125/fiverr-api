import { Request, Response } from "express"
import { AppDataSource } from "../../../db/data_source"
import Utils from "../../../utils"
import { Gig } from "../../../entities/gig"
import addGigSchema from "./schema"
import { IUser } from "../../../interfaces"
import { DeepPartial } from "typeorm"
import addOrderSchema from "./schema"
import { Order } from "../../../entities/order"
import { send_order_creation_email } from "../../../mail"
export default async function add_order(req: Request, res: Response) {
  const user = req.user as IUser
  const body = req.body
  const orderRepository = AppDataSource.getRepository(Order)
  const gigRepository = AppDataSource.getRepository(Gig)
  const valid = await Utils.validateSchema(res, addOrderSchema, body)
  if (!valid) return
  const existingGig = await gigRepository.findOne({ where: { id: body.gigId } })

  const checkExistingOrder = await orderRepository.findOne({
    where: { buyer: { id: user.id }, gig: { id: body.gigId } },
  })
  if (!existingGig) {
    return Utils.sendError(res, {
      status: "error",
      message: "You have no gigs in your order... please add at least one",
    })
  }
  if (checkExistingOrder) {
    return Utils.sendError(res, {
      status: "error",
      message: `You have already placed order on that gig`,
    })
  }
  const createOrder = await orderRepository.save({
    price: existingGig.price,
    status: body.status,
    gig: { id: body.gigId },
    buyer: { id: user.id },
    createdAt: new Date(),
  })
  const fullOrder = await orderRepository.findOne({
    where: { id: createOrder.id },
    relations: ["gig", "buyer"],
  })

  const emailData = {
    user: fullOrder?.buyer.email,
    gigName: fullOrder?.gig.title,
    orderId: fullOrder?.id,
    price: fullOrder?.gig.price,
    status: fullOrder?.status,
  }
  await send_order_creation_email(emailData)
  Utils.sendSuccess(res, {
    order: createOrder,
  })
}
