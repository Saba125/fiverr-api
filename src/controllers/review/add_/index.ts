import { Request, Response } from "express"
import { AppDataSource } from "../../../db/data_source"
import Utils from "../../../utils"
import { IUser } from "../../../interfaces"
import { Review } from "../../../entities/review"
export default async function add_review(req: Request, res: Response) {
  const user = req.user as IUser
  const body = req.body
  const reviewRepository = AppDataSource.getRepository(Review)
  const checkExistingReview = await reviewRepository.findOne({
    where: { gig: { id: body.gigId }, user: { id: user.id } },
  })
  if (checkExistingReview) {
    return Utils.sendError(res, {
      status: "error",
      message: `You have already left review for this gig`,
    })
  }
  const createReview = await reviewRepository.save({
    comment: body.comment,
    rating: body.rating,
    gig: { id: body.gigId },
    user: { id: user.id },
    createdAt: new Date(),
  })
  Utils.sendSuccess(res, {
    review: createReview,
  })
}
