import { create } from "zustand"
import { apiClient } from "../services/axios.js"

export const useAuthStore = create((set,get) => ({
    token:null,
    userData:null,
    isLoading:false,
    isInitialized:false,

    // Initialize store from localStorage on app load
    initializeAuth: () => {
        const userInfo = localStorage.getItem("userInfo")
        const userToken = localStorage.getItem("userToken")
        
        console.log("Initializing auth...")
        console.log("UserInfo from localStorage:", userInfo)
        
        set({ 
            token:userToken ? userToken : null,
            userData: userInfo ? JSON.parse(userInfo) : null,
            isInitialized: true 
        })
    },

    // Login Module
    userLogin: async({ user_email,user_password }) => {
      try {
            set({ isLoading: true });
            const responseData = await apiClient.post('/user/login',{ user_email,user_password })
            const actualRes = responseData?.data

            console.log("Login response:", actualRes)

            // Save user info to localStorage
            localStorage.setItem("userInfo",JSON.stringify(actualRes?.existing_user))
            localStorage.setItem("isLogin","true")
            localStorage.setItem("userToken",actualRes?.user_token)

            // Store token in memory (Zustand state)
            set({
                userData: actualRes?.existing_user,
                token: actualRes?.user_token, // Token comes from response
                isLoading: false
            })

            if(actualRes?.StatusCode === 404){
                return { 'StatusCode': actualRes?.StatusCode,'error':actualRes?.error, 'status':false }
            }
            if(actualRes?.StatusCode == 200){
                return { 'StatusCode':actualRes?.StatusCode, 'message':actualRes?.message, 'status': actualRes?.StatusCode < 400 }
            } 
            return { 'StatusCode':400,'error':"No Response from the backend" }

    } catch (error) {
            set({ isLoading:false })
            console.log("Error while logging in:",error)
            return { 'StatusCode':400,'error':error.response?.data?.error || error.response?.data?.message } 
    }
    },

    // Logout Module
    userLogout: async() => {
        try {
            // Clear localStorage
            localStorage.removeItem('userInfo')
            localStorage.removeItem('isLogin')
            localStorage.removeItem("userToken")
            
            // Clear store
            set({ token:null, userData:null })

            // Call backend logout
            const responseData = await apiClient.get("/user/user-logout")
            const actualRes = responseData?.data

            if(actualRes?.StatusCode === 200){
                return { 'StatusCode': actualRes?.StatusCode, 'message': actualRes?.message, 'status': true}
            }
        } catch (error) {
            console.log("Error while logging out:",error)
            return { 'StatusCode':400,'error':error.response?.data?.message || error.response?.data?.error }
        } 
    },

    // delete User
    deleteUser: async(user_id) => {
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
}))