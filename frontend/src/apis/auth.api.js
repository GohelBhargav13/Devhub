import { socket } from "../server/server.js"
import { apiClient } from "../services/axios.js"

// User Login API
export const userLoginApi = async({ userEmail,userPassword }) => {
    const user_login_details = {
        user_email:userEmail,
        user_password:userPassword
    }
    try {
       const responseData = await apiClient.post('/user/login',user_login_details)
       const actualRes = responseData?.data
       console.log(actualRes)

       if(actualRes?.StatusCode === 404){
            return { 'StatusCode': actualRes?.StatusCode,'error':actualRes?.error, 'status':false }
       }
       if(actualRes?.StatusCode == 200){
        
            return { 'StatusCode':actualRes?.StatusCode, 'message':actualRes?.message, 'status': actualRes?.StatusCode < 400 }
       } 
       return { 'StatusCode':400,'error':"No Response from the backend" }

    } catch (error) {
       console.log("Error while fetching a data from the backend of the login module",error)
        return { 'StatusCode':400,'error':error.response?.data?.error || error.response?.data?.message } 
    }
}

// User Logout API
export const userLogoutApi = async() => {
    try {
        const responseData = await apiClient.get("/user/user-logout")
        const actualRes = responseData?.data

        if(actualRes?.StatusCode == 200){
            return { 'StatusCode': actualRes?.StatusCode, 'message': actualRes?.message, 'status': true}
        }

    } catch (error) {
        console.log("Error while logging out a user",error)
        return { 'StatusCode':400,'error':error.response?.data?.message || error.response?.data?.error }
    }
}

// User Register API
export const userRegisterApi = async({ user_name,user_email,user_password }) => {
    try {
       const responseData = await apiClient.post("/user/register",{ user_name,user_email,user_password })
       const actualRes = responseData?.data

       if(actualRes?.StatusCode === 201){
            socket.emit("newUser",{ user_name,user_email,user_password,message:"New User Registered" })
            return { 'StatusCode':201, 'message': `Registration completed 🎉, Please Check Email`}
       }
        
    } catch (error) {
        console.log("Error while register a user in api",error?.response?.data?.error)
        return { 'StatusCode':400, 'error': error?.response?.data?.error}
    }
}

// email verify func
export const UserEmailVerify = async(email_token) => {
    try {
        const responseData = await apiClient.get(`/user/email-verify/${email_token}`)
        const actualRes = responseData?.data

        if(actualRes?.StatusCode >= 400){
            return { 'status':false, 'error': "Email is not verified" }
        }
        if(actualRes?.StatusCode === 200){
            return { 'status':true, 'message': "Email is Verified" }
        }
        
    } catch (error) {
        console.log("Error while verifying the users email from the api",error)
        return { 'status':false, 'error':error?.response?.data?.error || error?.response?.data?.message }
    }
}