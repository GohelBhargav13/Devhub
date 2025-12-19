import express from "express"
import { allActiveUsers, allPostCount, allUsersCount, allUsersDetails, totalUsersDetails,allPostDetails } from "../controller/admin.controller.js"
import { checkTokenExists, ensureUserAuthenticate } from "../middleware/auth.middleware.js"
import { checkUserRole } from "../middleware/check.middleware.js"

const adminRoutes = express.Router()

adminRoutes.use(checkTokenExists)
adminRoutes.use(ensureUserAuthenticate)
adminRoutes.use(checkUserRole(["ADMIN"]))

adminRoutes.get("/get-postcount-user",totalUsersDetails)
adminRoutes.get("/get-all-userscount",allUsersCount)
adminRoutes.get("/get-all-postscount",allPostCount)
adminRoutes.get("/active-user",allActiveUsers)
adminRoutes.get("/all-users",allUsersDetails)
adminRoutes.get("/all-posts",allPostDetails)

export default adminRoutes