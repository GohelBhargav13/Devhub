import express from "express"
import { ensureUserAuthenticate,checkTokenExists } from "../middleware/auth.middleware.js"
import { allPosts, allPostsForApiDocs, deletePostOfUser, getOnlyUserPosts, newPostCreation } from "../controller/post.controller.js"
const postRouter = express.Router()


postRouter.post("/create-post",checkTokenExists,ensureUserAuthenticate,newPostCreation)
postRouter.get("/all-posts",checkTokenExists,ensureUserAuthenticate,allPosts)
postRouter.get("/login-user-posts",checkTokenExists,ensureUserAuthenticate,getOnlyUserPosts)
postRouter.delete("/delete-post/:postId",checkTokenExists,ensureUserAuthenticate,deletePostOfUser)
postRouter.get("/all-posts-api-docs",allPostsForApiDocs)


export default postRouter