import { Request, Response } from "express"
import Utils from "../../../utils"
import registerSchema from "./schema"
import { AppDataSource } from "../../../db/data_source"
import { User } from "../../../entities/user"
import crypto from "crypto"
import geoip from "geoip-lite"
import { DeepPartial } from "typeorm"
import { send_register_email } from "../../../mail"
export default async function register(req: Request, res: Response) {
  const body = req.body
  const valid = await Utils.validateSchema(res, registerSchema, body)
  if (!valid) return
  const user = AppDataSource.getRepository(User)
  const existingUser = await user.findOne({ where: { email: body.email } })
  const profileImage = req.file ? `/images/profile/${req.file.filename}` : null
  const userIp =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress || null
  const formattedIp = userIp === "::1" ? "127.0.0.1" : userIp

  const userLocation = userIp ? geoip.lookup(userIp.toString()) : null
  if (existingUser) {
    return Utils.sendError(res, {
      status: "error",
      message: `User with email ${existingUser.email} already exists`,
    })
  }
  const hashedPassword = Utils.getCryptoHash(body.password)
  const verificationCode = crypto.randomBytes(32).toString("hex")
  const codeExpirationDate = new Date(Date.now() + 1000 * 60 * 10)
  const newUser = await user.create({
    bio: body.bio || null,
    codeExpirationDate,
    email: body.email,
    username: body.username,
    verificationCode,
    skills: body.skills,
    password: hashedPassword,
    location: body.location,
    profileImage,
    lastLoginIP: formattedIp,
    createdAt: new Date(),
  } as DeepPartial<User>)
  await user.save(newUser)
  const verificationUrl = `${process.env.FRONT_URL}/verify-email?verificationCode=${newUser.verificationCode}&email=${newUser.email}`
  await send_register_email(newUser.email, "Registration", "", verificationUrl)
  Utils.sendSuccess(res, {
    message: "You have been registered...Please check your email now",
  })
}
