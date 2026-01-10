import { apiClient } from "../services/axios.js"

// create a new question for the people
export const createNewQuestions = async({ question,duration }) => {
    try {
           const responseData = await apiClient.post("/quesans/new-question-create",{
                question,duration
            })
          const actualRes = responseData?.data
          if(actualRes?.StatusCode >= 400) {
              return { 'status':false, 'error': actualRes?.error, 'data':null }
          } 
          if(actualRes?.StatusCode === 200) {
              return { 'status':true, 'message':actualRes?.message, 'data':actualRes?.data }
          }
    } catch (error) {
        console.log("Error while creating a new post from api file",error)
        return { 'status':false, 'error':error.response?.data?.error || error?.response?.data?.message }
    }
}

// fetch the all comments from the question id
export const fetchQuestionsComment = async(question_id) => {
    try {
        const responseData = await apiClient.get(`/quesans/question-comments/${question_id}`)
        const actualRes = responseData?.data
        const question_comments = actualRes?.question_comments

        if(actualRes?.StatusCode >= 400){
            return { 'status':false, 'error':actualRes?.error || "Error while fetch a comments"}
        }

        if(actualRes?.StatusCode === 200){
            return { 'status':true, 'message':actualRes?.message || "Comments are fetched", 'data':question_comments }
        }
        
    } catch (error) {
        console.log("Error while fetching a question comments",error)
        return { 'status':false, 'error':error?.response?.data?.error || error?.response?.data?.message}
    }
}

// fetch the all question of from the platform
export const fetchAllQuestionsApi = async() => {
    try {
        const responseData = await apiClient.get("/quesans/get-all-questions")
        const actualRes = responseData?.data

        if(actualRes?.StatusCode >= 400){
            return { 'status':false, 'error':actualRes?.error || "Error while fetch a comments"}
        }

        if(actualRes?.StatusCode === 200){
            return { 'status':true, 'message':actualRes?.message || "Questions are fetched", 'data':actualRes?.data }
        }

    } catch (error) {
        return { 'status':false, 'error':error?.response?.data?.error || error?.response?.data?.message }
    }
}

// create a new comment on the post
export const createNewCommentOnQues = async({ que_id,comment_text }) => {
    try {
        const responseData = await apiClient.post(`/quesans/new-comment/${que_id}`,{
            comment_text
        })
        const actualRes = responseData?.data
        if(actualRes?.StatusCode >= 400){
            return { 'status':false, 'error': actualRes?.error || "Error while commenting on question" }
        }

        if(actualRes?.StatusCode === 200){
            console.log("socket fire thayu...!")
            return { 'status':true, 'message':actualRes?.message || "comment successfully", 'comment_details':actualRes?.data?.new_comment_details }
        }
        
    } catch (error) {
        return { 'status':false, 'error':error?.response?.data?.error || error?.response?.data?.message }
    }
}

// delete a question comment from the question
export const deleteQuestionComment = async(comment_id) => {
    try {
        const responseData = await apiClient.delete(`/quesans/delete-comment/${comment_id}`)
        const actualRes = responseData?.data

        if(actualRes?.StatusCode >= 400){
            return { 'status':false, 'error': actualRes?.error || "Error while deleting a question comment" }
        }

        return { 'status':true, 'message':actualRes?.message || "Comment deleted successfully" }
    } catch (error) {
         return { 'status':false, 'error':error?.response?.data?.error || error?.response?.data?.message }
    }
}