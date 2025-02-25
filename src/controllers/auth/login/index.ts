import e, { Request, Response } from "express"
import Utils from "../../../utils"
import { AppDataSource } from "../../../db/data_source"
import { User } from "../../../entities/user"
import loginSchema from "./schema"
export default async function login(req: Request, res: Response) {
  const body = req.body
  const hashedPassword = Utils.getCryptoHash(body.password)
  const oneDay = 1000 * 60 * 60 * 24
  const valid = await Utils.validateSchema(res, loginSchema, body)
  if (!valid) return
  const user = AppDataSource.getRepository(User)
  const existingUser = await user.findOne({ where: { email: body.email } })
  if (!existingUser) {
    return Utils.sendError(res, {
      status: "error",
      message: `User with email ${body.email} does not exist`,
    })
  }
  if (existingUser.password !== hashedPassword) {
    return Utils.sendError(res, {
      status: "error",
      message: `Password is incorrect`,
    })
  }
  if (!existingUser.emailVerified) {
    return Utils.sendError(res, {
      status: "error",
      message: "Your account is not verified...Please verify first",
    })
  }
  const token = Utils.createToken(existingUser)
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + oneDay),
  })
  Utils.sendSuccess(res, {
    user: existingUser,
    token,
  })
}
