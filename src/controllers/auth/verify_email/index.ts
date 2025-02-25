import { Request, Response } from "express"
import verifyEmailSchema from "./schema"
import { AppDataSource } from "../../../db/data_source"
import Utils from "../../../utils"
import { User } from "../../../entities/user"
export default async function verify_email(req: Request, res: Response) {
  const body = req.body
  const valid = await Utils.validateSchema(res, verifyEmailSchema, body)
  if (!valid) return
  const user = AppDataSource.getRepository(User)
  const existingUser = await user.findOne({ where: { email: body.email } })
  if (!existingUser) {
    return Utils.sendError(res, {
      status: "error",
      message: `User with email ${body.email} is not found`,
    })
  }
  const currentDate = new Date()
  if (
    existingUser.verificationCode !== body.verificationCode &&
    currentDate > existingUser.codeExpirationDate
  ) {
    return Utils.sendError(res, {
      status: "error",
      message: `Code is incorrect or expired`,
    })
  }
  existingUser.verificationCode = null
  existingUser.emailVerified = true
}
