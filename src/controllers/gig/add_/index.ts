import { Request, Response } from "express"
import { AppDataSource } from "../../../db/data_source"
import Utils from "../../../utils"
import { Gig } from "../../../entities/gig"
import addGigSchema from "./schema"
import { IUser } from "../../../interfaces"
import { DeepPartial } from "typeorm"
export default async function add_gig(req: Request, res: Response) {
  const gig = AppDataSource.getRepository(Gig)
  const user = req.user as IUser
  const body = req.body
  const valid = await Utils.validateSchema(res, addGigSchema, body)
  if (!valid) return
  const image = req.file ? `images/gigs/${req.file.filename}` : null
  const dbRes = await gig.create({
    category: body.category,
    description: body.description,
    createdAt: new Date(),
    image,
    price: body.price,
    rating: body.rating,
    tags: body.tags,
    status: body.status,
    sellerId: user.id,
    title: body.title,
  } as DeepPartial<Gig>)
  Utils.sendSuccess(res, {
    gig: dbRes,
  })
}
