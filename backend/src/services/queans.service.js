import { and, desc, eq } from "drizzle-orm"
import { db } from "../db_config/db_config_postgres.js" 
import { quesansTable } from "../models/queandans.models.js"
import { userTable } from "../models/user.models.js"
import { commentTable } from "../models/comment.models.js"

// is question is exists or not
export const questionsIsExists = async(question_id) => {
    try {
        const [question] = await db.select().from(quesansTable).where(eq(quesansTable.id,question_id))
        if(!question){
            return { 'status':false, 'error':"Question is not found" }
        }
        return { 'status':true, 'message':"Question is founded....", 'question_details':question }
    } catch (error) {
        console.log("Error while fetching a question details",error)
    }
}

// create a new question poll
export const createNewQuestionService = async(question,duration,userId) => {
    try {

       const date_calculation = new Date(Date.now() + duration * 60 * 1000)
       const [newQuestion] = await db.insert(quesansTable).values({
            question_text:question,
            question_duration:date_calculation,
            user_id:userId
        }).returning({
             new_question_id:quesansTable.id,
        })
        if(!newQuestion){
            return { 'status':false, 'error': "Error in new Question creation", 'new_question_id':null }
        }

        return { 'status':true, 'message': "New Question is created", 'new_question_id':newQuestion.new_question_id }
        
    } catch (error) {
        console.log("Error while creating a new question",error)
    }
}

// Get all questions of the platform
export const getAllQuestionsService = async() => {
    try {
       const allQuestions = await db.select({
            question_id:quesansTable.id,
            question_text:quesansTable.question_text,
            question_duration:quesansTable.question_duration,
            question_at:quesansTable.created_at,
            user_name:userTable.user_name,
            user_internal_name:userTable.internal_username
       }).from(quesansTable).innerJoin(userTable,eq(userTable.user_id,quesansTable.user_id)).orderBy(desc(quesansTable.created_at)).limit(20)
    //    if(allQuestions.length === 0){
    //        return { 'status':false, 'error': "No questions found", 'questions':null }
    //    }

       return { 'status':true, 'questions':allQuestions, 'message':"All questions are fetched" }
        
    } catch (error) {
        console.log("Error while fetch the all questions from services",error)
    }
}

// users own questions
export const getUsersQuestionsServices = async(user_id) => {
    try {

       const usersOwnPosts = await db.select({
            question_id:quesansTable.id,
            question_text:quesansTable.question_text,
            question_duration:quesansTable.question_duration,
            question_at:quesansTable.created_at,
            user_name:userTable.user_name,
            user_internal_name:userTable.internal_username,
        }).from(quesansTable).innerJoin(userTable,eq(userTable.user_id,quesansTable.user_id)).where(eq(userTable.user_id,user_id))

        if(usersOwnPosts.length === 0){
            return { 'status':false, 'error':"No users questions", 'user_own_questions':null }
        }

        return { 'status':true, 'message':"user questions are fetched", 'user_own_questions':usersOwnPosts }
        
    } catch (error) {
        console.log("Error while fetching the users own questions with comments",error)
    }
}

// fetch the posts comment of the particular user
export const fetchQuestionsCommentOfUser = async(user_id,question_id) => {
    try {
          const response = await questionsIsExists(question_id)
            if(!response.status){
                return { 'status':false, 'error':"Question is not found..." }
            }

           const questionCommentByUser = await db.select({
                comment_id:commentTable.com_id,
                comment_text:commentTable.comment_text,
                comment_created:commentTable.created_at,
                user_id:commentTable.user_id,
                user_name:userTable.user_name,
                user_internal_name:userTable.internal_username          
           }).from(commentTable).innerJoin(userTable,eq(userTable.user_id,commentTable.user_id)).innerJoin(quesansTable,eq(quesansTable.id,commentTable.post_id)).where(eq(commentTable.post_id,question_id))

        //    if(questionCommentByUser.length === 0){
        //         return { 'status':false, 'error': "No comments are there" }
        //    }

           return { 'status':true, 'message':"comment fetched successfully", 'question_comments':questionCommentByUser }

    } catch (error) {
        console.log("Error while fetching a questions comment of the specific user",error)
    }
}

// commeting on the questions 
export const commentOnTheQuestion = async(post_id,user_id,comment_text) => {
    try {

        const response = await questionsIsExists(post_id)
        if(!response.status){
            return { 'status':false, 'error':"Question is not found..." }
        }

        const existingQuestion = response?.question_details
        if(new Date() < new Date(existingQuestion?.question_duration)){
     
            const [new_comment] = await db.insert(commentTable).values({
                comment_text:comment_text,
                post_id:post_id,
                user_id:user_id
            }).returning({
                new_comment_id:commentTable.com_id
            })

            // fetch a new comment by users information
           const [new_comment_with_user] = await db.select({
                comment_text:commentTable.comment_text, 
                comment_created_at:commentTable.created_at,
                user_name:userTable.user_name
            }).from(commentTable).innerJoin(userTable,eq(commentTable.user_id,userTable.user_id)).innerJoin(quesansTable,eq(quesansTable.id,post_id)).where(eq(commentTable.com_id,new_comment.new_comment_id))

            if(!new_comment){
                return { 'status':false, 'error':"Error in commenting a new comment" }
            }
                
            return { 'status':true, 'message':"Comment successfully", 'new_comment_id':new_comment.new_comment_id, 'new_comment_details':new_comment_with_user }
        
        }else {
            return { 'status':false, 'error': "Question Duration is end please try in other questions" }
        }
    } catch (error) {
        console.log("Error while commenting on the questions",error)
    }
}

// delete comments from the question
export const deleteQuestionComment = async(comment_id,user_id) => {
    try {
        const [deleted_comment] = await db.delete(commentTable).where(and(eq(commentTable.com_id,comment_id),eq(commentTable.user_id,user_id))).returning({
            deleted_comment_id:commentTable.com_id
        })

        if(!deleted_comment){
            return { 'status':false, 'error': "Error while deleting a comment" }
        }

        return { 'status':true, 'message':"comment deleted successfully", 'deleted_comment_id':deleted_comment?.deleted_comment_id }
        
    } catch (error) {
        console.log("Error while deleting a comment",error)
    }
}
