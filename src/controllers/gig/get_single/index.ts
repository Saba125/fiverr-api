import { Request, Response } from "express"
import { Between, DeepPartial, ILike } from "typeorm"
import { AppDataSource } from "../../../db/data_source"
import { Gig } from "../../../entities/gig"
import Utils from "../../../utils"
export default async function get_single_gig(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const gigRepository = AppDataSource.getRepository(Gig)
  const singleGig = await gigRepository.findOne({
    where: { id },
  })
  if (!singleGig) {
    return Utils.sendError(res, {
      status: "error",
      message: `Gig with id ${id} is not found`,
    })
  }
  Utils.sendSuccess(res, {
    gig: singleGig,
  })
}
