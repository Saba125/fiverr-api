import { Request, Response } from "express"
import { AppDataSource } from "../../../db/data_source"
import Utils from "../../../utils"
import { Gig } from "../../../entities/gig"
import { IUser } from "../../../interfaces"
import { DeepPartial } from "typeorm"
import { Order } from "../../../entities/order"
import { send_order_cancellation_email } from "../../../mail"
export default async function cancel_order(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user = req.user as IUser
  const orderReposiory = AppDataSource.getRepository(Order)
  const existingOrder = await orderReposiory.findOne({
    where: { id },
    relations: ["gig", "buyer"],
  })
  if (!existingOrder) {
    return Utils.sendError(res, {
      status: "error",
      message: `Order with id ${id} is not found`,
    })
  }
  if (existingOrder.buyer.id !== user.id) {
    return Utils.sendError(res, {
      status: "error",
      message: "You can only cancel your order",
    })
  }

  const emailData = {
    user: existingOrder?.buyer.email,
    gigName: existingOrder?.gig.title,
    orderId: existingOrder?.id,
    price: existingOrder?.gig.price,
    status: existingOrder?.status,
  }
  await orderReposiory.remove(existingOrder)
  await send_order_cancellation_email(emailData)
  Utils.sendSuccess(res, {
    message: `Order with id ${id} has been cancelled`,
  })
}
