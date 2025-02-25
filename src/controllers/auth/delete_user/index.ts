import { Request, Response } from "express"
import Utils from "../../../utils"
import { AppDataSource } from "../../../db/data_source"
import { User } from "../../../entities/user"
export default async function delete_user(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const user = AppDataSource.getRepository(User)
  const existingUser = await user.findOneBy({ id })
  if (!existingUser) {
    return Utils.sendError(res, {
      status: "error",
      message: `User with id ${id} is not found`,
    })
  }
  await user.remove(existingUser)
  Utils.sendSuccess(res, {
    message: `User deleted with id ${id}`,
  })
}
