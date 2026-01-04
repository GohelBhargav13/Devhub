import express from "express"
import { deleteUserAccount, getProfile, userEmailVerify, userLogin, userLogout, userLogoutForApiDocs, userRegister } from "../controller/user.controller.js"
import { checkTokenExists, ensureUserAuthenticate } from "../middleware/auth.middleware.js"
const userRouter = express.Router()

// All User Routes
userRouter.post("/register",userRegister)
userRouter.post("/login",userLogin)
userRouter.get("/user-porfile",checkTokenExists,ensureUserAuthenticate,getProfile)
userRouter.get("/user-logout",checkTokenExists,ensureUserAuthenticate,userLogout)
userRouter.post("/user-account",checkTokenExists,ensureUserAuthenticate,deleteUserAccount)
userRouter.get("/email-verify/:user_token",userEmailVerify)
userRouter.get("/user-logout-api-docs",userLogoutForApiDocs)

export default userRouter