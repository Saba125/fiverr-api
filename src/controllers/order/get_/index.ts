import { Request, Response } from "express"
import { AppDataSource } from "../../../db/data_source"
import Utils from "../../../utils"
import { Gig } from "../../../entities/gig"
import { IUser } from "../../../interfaces"
import { DeepPartial } from "typeorm"
import { Order } from "../../../entities/order"
export default async function get_orders(req: Request, res: Response) {
  const user = req.user as IUser
  const orderRepository = AppDataSource.getRepository(Order)
  const getOrders = await orderRepository.find({
    where: { buyer: { id: user.id } },
  })
  if (getOrders.length === 0) {
    return Utils.sendError(res, {
      status: "error",
      message: "You dont have any orders",
    })
  }
  Utils.sendSuccess(res, {
    orders: getOrders,
  })
}
