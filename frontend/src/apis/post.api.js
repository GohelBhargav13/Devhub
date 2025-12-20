import { apiClient } from "../services/axios.js"


// fetching all the posts
export const fetchAllPosts = async() => {
    try {
        const responseData = await apiClient.get("/post/all-posts")
        const actualRes = responseData?.data

        if(actualRes?.StatusCode >= 400){
            return { 'status':false, 'all_posts':null, 'error': actualRes?.error }
        }
        const actual_data = actualRes?.data?.all_posts
        if(actualRes?.StatusCode === 200){
            return { 'status':true, 'all_posts':actual_data, 'message':actualRes?.message }
        }

    } catch (error) {
        console.log("Error while fetching a all posts",error)
        return { 'status':false, 'all_posts':null, 'error':error?.response?.data?.error || error?.response?.data?.message }
    }
}

// fetch the login user posts
export const loginUserPosts = async() => {
    try {
       const responseData = await apiClient.get("/post/login-user-posts")
       const actualRes = responseData?.data

       if(actualRes?.StatusCode >= 400){
            return { 'status':false, 'u_posts':null, 'error': actualRes?.error }
       }
       if(actualRes?.StatusCode === 200){
            return { 'status':true, 'u_posts':actualRes?.data?.u_posts, 'message': actualRes?.message }
       }
    
    } catch (error) {
        console.log("Error in the login user posts",error)
        return { 'status':false, 'u_posts':null, 'error':error?.response?.data?.error || error?.response?.data?.message }
    }
}

// create new post 
export const createNewPost = async({ post_description,post_link }) => {
    try {

        const responseData = await apiClient.post("/post/create-post",{ post_description,post_link })
        const actual_data = responseData?.data

        if(actual_data?.StatusCode >= 400){
            return { 'status':false, 'error': actual_data?.error }
        }
        if(actual_data?.StatusCode === 201){
            return { 'status':true, 'message': actual_data?.message }
        }
        
    } catch (error) {
        console.log("Error while creating a new post from the api file",error)
        return { 'status':false, 'message':error?.response?.data?.error ||  error?.response?.data?.message  }
    }
}