import express from "express"
import authMiddleware from "../middlewares/auth"
import uploader from "../config/multer"
import usersController from "../controllers/auth/export"
import roleMiddleware from "../middlewares/permission"
import { Role } from "../entities/user"
import gigController from "../controllers/gig/export"
import orderController from "../controllers/order/export"
import reviewController from "../controllers/review/export"

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
Router.get("/gigs", authMiddleware, gigController.get_gigs)
Router.get("/gigs/:id", authMiddleware, gigController.get_single_gig)
// orders
Router.post("/orders/add", authMiddleware, orderController.add_order)
Router.delete(
  "/orders/cancel/:id",
  authMiddleware,
  orderController.cancel_order
)
Router.get("/orders/get", authMiddleware, orderController.get_orders)
// reviews
Router.post("/reviews/add", authMiddleware, reviewController.add_review)
Router.put("/reviews/edit/:id", authMiddleware, reviewController.edit_review)
Router.delete(
  "/reviews/delete/:id",
  authMiddleware,
  reviewController.delete_review
)

export default Router
