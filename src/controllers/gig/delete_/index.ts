import { Request, Response } from "express"
import { AppDataSource } from "../../../db/data_source"
import Utils from "../../../utils"
import { Gig } from "../../../entities/gig"
import { IUser } from "../../../interfaces"
export default async function delete_gig(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user = req.user as IUser
  const gig = AppDataSource.getRepository(Gig)
  const existingGig = await gig.findOneBy({ id })
  if (!existingGig) {
    return Utils.sendError(res, {
      status: "error",
      message: `Gig with id ${id} is not found`,
    })
  }
  if (existingGig.sellerId.id !== user.id) {
    return Utils.sendError(res, {
      status: "error",
      message: "You can only delete your gig",
    })
  }
  await gig.remove(existingGig)
  Utils.sendSuccess(res, {
    message: "Gig deleted",
  })
}
