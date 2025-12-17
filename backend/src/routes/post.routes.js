import express from "express"
import { ensureUserAuthenticate,checkTokenExists } from "../middleware/auth.middleware.js"
import { newPostCreation } from "../controller/post.controller.js"
const postRouter = express.Router()

postRouter.use(checkTokenExists)
postRouter.use(ensureUserAuthenticate)

postRouter.post("/create-post",newPostCreation)


export default postRouter