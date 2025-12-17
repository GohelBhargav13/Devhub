import express from "express"
import { getProfile, userLogin, userRegister } from "../controller/user.controller.js"
import { checkTokenExists, ensureUserAuthenticate } from "../middleware/auth.middleware.js"
const userRouter = express.Router()

// All User Routes
userRouter.post("/register",userRegister)
userRouter.post("/login",userLogin)
userRouter.get("/user-porfile",checkTokenExists,ensureUserAuthenticate,getProfile)

export default userRouter