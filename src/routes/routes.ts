import express from "express"
import authMiddleware from "../middlewares/auth"
import uploader from "../config/multer"
import usersController from "../controllers/auth/export"
import roleMiddleware from "../middlewares/permission"
import { Role } from "../entities/user"
import gigController from "../controllers/gig/export"

const Router = express.Router()
// users
Router.post(
  "/auth/register",
  uploader.imageProfileUploader.single("profileImage"),
  usersController.register
)
Router.post("/auth/login", usersController.login)
Router.get("/my-profile", authMiddleware, usersController.profile)
Router.delete(
  "/user/:id",
  authMiddleware,
  roleMiddleware(Role.ADMIN),
  usersController.delete_user
)
// gigs
Router.post(
  "/gigs",
  authMiddleware,
  uploader.gigImageUploader.single("image"),
  gigController.add_gig
)
Router.delete("/gigs/:id", authMiddleware, gigController.delete_gig)
Router.put("/gigs/:id", authMiddleware, gigController.edit_gig)

export default Router
