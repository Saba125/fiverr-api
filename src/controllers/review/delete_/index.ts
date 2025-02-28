import { Request, Response } from "express"
import { AppDataSource } from "../../../db/data_source"
import Utils from "../../../utils"
import { IUser } from "../../../interfaces"
import { Review } from "../../../entities/review"
export default async function delete_review(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user = req.user as IUser
  const reviewRepository = AppDataSource.getRepository(Review)
  const existingReview = await reviewRepository.findOne({
    where: { id },
    relations: ["user"],
  })
  if (!existingReview) {
    return Utils.sendError(res, {
      status: "error",
      message: "Review not found",
    })
  }
  if (existingReview.user.id !== user.id) {
    return Utils.sendError(res, {
      status: "error",
      message: "You can only delete your own review",
    })
  }
  await reviewRepository.delete(id)
  Utils.sendSuccess(res, {
    message: `Review with id ${id} has been deleted`,
  })
}
