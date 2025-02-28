import { Request, Response } from "express"
import { Between, DataSource, ILike } from "typeorm"
import { AppDataSource } from "../../../db/data_source"
import { Gig } from "../../../entities/gig"
import { IUser } from "../../../interfaces"
import Utils from "../../../utils"
export default async function get_gigs(req: Request, res: Response) {
  const {
    title,
    orderBy = "createdAt",
    order = "DESC",
    minPrice,
    maxPrice,
  } = req.query
  const gigs = AppDataSource.getRepository(Gig)
  const user = req.user as IUser
  const filter: any = {
    status: "active",
  }
  if (title) {
    filter.title = ILike(`%${title}`)
  }
  if (minPrice && maxPrice) {
    filter.price = Between(Number(minPrice), Number(maxPrice))
  } else if (minPrice) {
    filter.price = Between(Number(minPrice), Number.MAX_SAFE_INTEGER)
  } else if (maxPrice) {
    filter.price = Between(0, Number(maxPrice))
  }
  const fetchGigs = await gigs.find({
    where: filter,
    order: {
      [orderBy as string]: order === "ASC" ? "ASC" : "DESC",
    },
  })
  if (fetchGigs.length === 0) {
    return Utils.sendError(res, {
      status: "error",
      message: `Gigs not found`,
    })
  }
  Utils.sendSuccess(res, fetchGigs)
}
