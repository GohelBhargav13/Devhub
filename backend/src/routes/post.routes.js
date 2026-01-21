import express from "express"
import { ensureUserAuthenticate,checkTokenExists } from "../middleware/auth.middleware.js"
import { allPosts, allPostsForApiDocs, deletePostOfUser, deleteSavePost, fetchOnePostById, getOnlyUserPosts, newPostCreation, saveUserPost, userAllSavedPosts } from "../controller/post.controller.js"
const postRouter = express.Router()


postRouter.post("/create-post",checkTokenExists,ensureUserAuthenticate,newPostCreation)
postRouter.get("/all-posts",checkTokenExists,ensureUserAuthenticate,allPosts)
postRouter.get("/login-user-posts",checkTokenExists,ensureUserAuthenticate,getOnlyUserPosts)
postRouter.delete("/delete-post/:postId",checkTokenExists,ensureUserAuthenticate,deletePostOfUser)
postRouter.post("/add-save-post/:post_id",checkTokenExists,ensureUserAuthenticate,saveUserPost)
postRouter.delete("/remove-save-post/:post_id",checkTokenExists,ensureUserAuthenticate,deleteSavePost)
postRouter.get("/all-saved-posts",checkTokenExists,ensureUserAuthenticate,userAllSavedPosts)
postRouter.get("/all-posts-api-docs",allPostsForApiDocs)
postRouter.get("/post-details/show-post-details/:postId",fetchOnePostById)


export default postRouter