import { Request, Response } from "express"
import { AppDataSource } from "../../../db/data_source"
import Utils from "../../../utils"
import { IUser } from "../../../interfaces"
import { Review } from "../../../entities/review"

export default async function edit_review(req: Request, res: Response) {
  try {
    const user = req.user as IUser
    const body = req.body
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return Utils.sendError(res, {
        status: "error",
        message: "Invalid review ID",
      })
    }

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
        message: "You can only edit your own review",
      })
    }

    await reviewRepository.update(id, body)

    const updatedReview = await reviewRepository.findOne({ where: { id } })

    return Utils.sendSuccess(res, {
      review: updatedReview,
    })
  } catch (error) {
    console.error("Error updating review:", error)
    return Utils.sendError(res, {
      status: "error",
      message: "An error occurred while updating the review",
    })
  }
}
