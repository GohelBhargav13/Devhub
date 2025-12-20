import { apiClient } from "../services/axios.js"

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