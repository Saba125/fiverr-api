import { Request, Response } from "express"
import { AppDataSource } from "../../../db/data_source"
import { Gig } from "../../../entities/gig"
import Utils from "../../../utils"
import { IUser } from "../../../interfaces"
import editGigSchema from "./schema"
import { DeepPartial } from "typeorm"
export default async function edit_gig(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const gig = AppDataSource.getRepository(Gig)
  const user = req.user as IUser
  const valid = Utils.validateSchema(res, editGigSchema, req.body)
  if (!valid) return
  const existingGig = (await gig.findOne({
    where: { id },
    relations: ["sellerId"],
  })) as DeepPartial<Gig>
  const image = req.file
    ? `images/gigs/${req.file.filename}`
    : existingGig?.image
  if (!existingGig) {
    return Utils.sendError(res, {
      status: "error",
      message: `Gig not found`,
    })
  }
  if (existingGig.sellerId?.id !== user.id) {
    return Utils.sendError(res, {
      status: "error",
      message: "You can only edit your own gig",
    })
  }
  await gig.update(id, { ...req.body, image })
  const updatedGig = await gig.findOneBy({ id })
  Utils.sendSuccess(res, {
    gig: updatedGig,
  })
}
