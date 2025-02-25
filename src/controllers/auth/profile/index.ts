import { Request, Response } from "express"
import Utils from "../../../utils"
export default async function profile(req: Request, res: Response) {
  const user = req.user
  Utils.sendSuccess(res, user)
}
