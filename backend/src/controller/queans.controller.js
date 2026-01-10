import { commentOnTheQuestion, createNewQuestionService, deleteQuestionComment, fetchQuestionsCommentOfUser, getAllQuestionsService, getUsersQuestionsServices } from "../services/queans.service.js"

/**
 * 
 * @param {import("express").Request} req
 * @param {import("express").Response} res 
 */
// create a new question controller
export const createNewQuestion = async(req,res) => {
    try {
        const { question,duration } = req.body

        // All fields are required
        if(!question || !duration){
            return res.status(400).json({ 'StatusCode':400, 'error': "All fields are required" })
        }

        const responseData = await createNewQuestionService(question,duration,req?.user?.user_id)
        if(!responseData?.status){
            return res.status(400).json({ 'StatusCode':400, 'error':responseData?.error || "Error in creating new question" })
        }

        res.status(200).json({ 'StatusCode':200, 'message': responseData?.message || "New question is created Successfully", 'data':responseData?.new_question_id })

    } catch (error) {
        console.log("Error while creating a new question",error)
    }
}

// Get all questions controller
/**
 * 
 * @param {import("express").Request} req
 * @param {import("express").Response} res 
 */
export const getAllQuestions = async(req,res) => {
    try {
        const responseData = await getAllQuestionsService()
        if(!responseData?.status){
            return res.status(400).json({ 'StatusCode':400, 'error':responseData?.error || "Error in getting all questions" })
        }

        res.status(200).json({ 'StatusCode':200, 'message':responseData?.message || "All questions are fetched", 'data':responseData?.questions })
    } catch (error) {
        console.log("Error while getting all questions from main controller",error)
    }
}

// Users own posts are
/**
 * 
 * @param {import("express").Request} req
 * @param {import("express").Response} res 
 */
export const usersOwnQuestions = async(req,res) => {
    try {
        const user_id = req.user.user_id
        const responseData = await getUsersQuestionsServices(user_id)

        if(!responseData?.status){
            return res.status(400).json({ 'StatusCode':400, 'error':responseData?.error || "Error while fetching users own questions" })
        }        
        
        res.status(200).json({ 'StatusCode':200, 'message': responseData?.message || "User own questions are fetched...", 'user_own_questions':responseData?.user_own_questions })
    } catch (error) {
        console.log("Error while fetching the users own questions",error)
    }
}

// comment on the question post
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const commentOnQuestions = async(req,res) => {
    try {
        const { questionId } = req.params
        const user_id = req.user.user_id
        const { comment_text } = req.body
        
        if(!questionId){
            return res.status(400).json({ 'StatusCode':400, 'error':"All fields are required" })
        }
        const responseData = await commentOnTheQuestion(questionId,user_id,comment_text)
        if(!responseData.status){
            return res.status(400).json({ 'StatusCode':400, 'error':responseData?.error })
        }

        res.status(200).json({ 'StatusCode':200, 'message':responseData?.message || "comment successfully", 'data':{ 'comment_id':responseData?.new_comment_id, 'new_comment_details':responseData?.new_comment_details } })
        
    } catch (error) {
        console.log("Error while commenting on the questions from the controller",error)
    }
}

// fetch a question comments by user
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const fetchQuestionCommentUser = async(req,res) => {
    try {
        const { questionId } = req.params
        const userId = req.user.user_id

        if(!questionId || !userId){
            return res.status(400).json({ 'StatusCode':400, 'error': "All fields are required" })
        }

        const responseData = await fetchQuestionsCommentOfUser(userId,questionId)
        if(!responseData?.status){
            return res.status(400).json({ 'StatusCode':400, 'error':responseData?.error || "No comments are there..." })
        }

        res.status(200).json({ 'StatusCode':200, 'message': responseData?.message || "question comments are...", 'question_comments':responseData?.question_comments })

    } catch (error) {
        console.log("Error while fetching a question comment by the user",error)
    }
}

// delete a comment from the question
/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export const deleteAComment = async(req,res) => {
    try {
        const { commentId } = req.params
        const userId = req?.user?.user_id

        if(!commentId || !userId){
            return res.status(400).json({ 'StatusCode':400, 'error': "All fields are required" })
        }

        const response = await deleteQuestionComment(commentId,userId)
        if(!response.status){
            return res.status(400).json({ 'StatusCode':400, 'error':response?.error || "Error while deleting a comment" })
        }

        res.status(200).json({ 'StatusCode':200, 'message': response?.message || "Comment is deleted successfully", 'data':response?.deleted_comment_id })
        
    } catch (error) {
        console.log("Error while deleting a comment",error)
    }
}