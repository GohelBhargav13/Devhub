import express from "express"
import { checkTokenExists,ensureUserAuthenticate } from "../middleware/auth.middleware.js"
import { commentOnQuestions, createNewQuestion, deleteAComment, fetchQuestionCommentUser, getAllQuestions, usersOwnQuestions } from "../controller/queans.controller.js"

const questionRouter = express.Router()

questionRouter.post("/new-question-create",checkTokenExists,ensureUserAuthenticate,createNewQuestion)
questionRouter.get("/get-all-questions",checkTokenExists,ensureUserAuthenticate,getAllQuestions)
questionRouter.get("/get-user-questions",checkTokenExists,ensureUserAuthenticate,usersOwnQuestions)
questionRouter.post("/new-comment/:questionId",checkTokenExists,ensureUserAuthenticate,commentOnQuestions)
questionRouter.delete("/delete-comment/:commentId",checkTokenExists,ensureUserAuthenticate,deleteAComment)
questionRouter.get("/question-comments/:questionId",checkTokenExists,ensureUserAuthenticate,fetchQuestionCommentUser)
export default questionRouter