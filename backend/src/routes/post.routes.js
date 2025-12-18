import express from "express"
import { ensureUserAuthenticate,checkTokenExists } from "../middleware/auth.middleware.js"
import { allPosts, deletePostOfUser, getOnlyUserPosts, newPostCreation } from "../controller/post.controller.js"
const postRouter = express.Router()

postRouter.use(checkTokenExists)
postRouter.use(ensureUserAuthenticate)

postRouter.post("/create-post",newPostCreation)
postRouter.get("/all-posts",allPosts)
postRouter.get("/login-user-posts",getOnlyUserPosts)
postRouter.delete("/delete-post/:postId",deletePostOfUser)


export default postRouter