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

// delete a post by the user
export const deletePost = async(post_id) => {
    try {
       const responseData = await apiClient.delete(`/post/delete-post/${post_id}`)
       const actual_data = responseData?.data

       if(actual_data?.StatusCode >= 400){
            return { 'status':false, 'error': actual_data?.error }
       }
       if(actual_data?.StatusCode === 200){
            return { 'status':true, 'message':actual_data?.message, 'data': actual_data?.data }
       }
        
    } catch (error) {
        console.log("Error while deleting a post from the api file",error)
        return { 'status':false, 'error': error?.response?.data?.errro || error?.response?.data?.message }
    }
}

// count User, Posts, Active Users
export const countAll = async() => {
    try {
        
        const actual_data = await Promise.all([
            apiClient.get("/admin/get-all-userscount"),
            apiClient.get("/admin/get-all-postscount"),
            apiClient.get("/admin/active-user")
        ])

        if(actual_data?.StatusCode >= 400){
            return { 'status':false, 'error': actual_data?.error }
        }
        if(actual_data.length > 0){
            return { 'status':true, 'data':actual_data }
        }
        
    } catch (error) {
        console.log("Error while deleting a post from the api file",error)
        return { 'status':false, 'error': error?.response?.data?.errro || error?.response?.data?.message }
    }
}

// all users details
export const allUsersDetails = async() => {
    try {
        const responseData = await apiClient.get("/admin/all-users")
        const actual_data = responseData?.data

        if(actual_data?.StatusCode >= 400){
            return { 'status':false, 'error':actual_data?.error, 'user_data':null }
        }
        if(actual_data?.StatusCode === 200){
            return { 'status':true, 'message':actual_data?.message, 'user_data':actual_data?.all_user_details}
        }
        
    } catch (error) {
        console.log("Error while fetching the all users data",error)
        return { 'status':false, 'error':error?.response?.data?.error || error?.response?.data?.message }
    }
}

// delete users
export const deleteUserFunc = async(user_id) => {
    try {
        const responseData = await apiClient.delete(`/admin/delete-user/${user_id}`)
        const actualRes = responseData?.data

        if(actualRes?.StatusCode >= 400){
            return { 'status':false, 'error':actualRes?.error, 'deletedu_details':null }
        }

        if(actualRes?.StatusCode === 200){
            return { 'status':true, 'message':actualRes?.message, 'deletedu_details':actualRes?.data }
        }
        
    } catch (error) {
        console.log("Error while deleting a user with the api",error)
        return { 'status':false, 'error':error?.response?.data?.error || error?.response?.data?.message }
    }
}