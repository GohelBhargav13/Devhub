import { createNewUser,isPasswordMatch,isUserExisting,changeUserStatusLogin,changeUserStatusLogout } from  "../services/user.service.js"
import { userPasswordHash,generateUserToken } from "../services/security.service.js"

// Register controller
export const userRegister = async(req,res) => {
    try {
        const { user_name, user_email, user_password } = req.body
        
        // All fields validation
        if(!user_name || !user_email || !user_password){
            return  res.status(400).json({ 'message': 'All Fields are required' })
        }

        // User is existing or not
        const { status } = await isUserExisting(user_email)
        if(status){
            return res.status(400).json({'StatusCode':400, 'error': `${user_email} is already exists` })
        }

        // User password hash & salt and also create a new user
        const { salt, hashed_password } = await userPasswordHash(user_password)
        const { new_user_id } = await createNewUser(user_name,user_email,hashed_password,salt)

        if(new_user_id){
            return res.status(201).json({ 'StatusCode':201, 'data':{ new_user_id }, 'message': 'User register Successfully' })
        }

    } catch (error) {
        console.log('Error while in main fucntion of the user register controller', error)
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @returns 
 */
// Login controller
export const userLogin = async (req,res) => {
    try {
        const { user_email,user_password } = req.body
            
        // All fields validation
        if(!user_email || !user_password){
            return  res.status(400).json({ 'StatusCode':400, 'message': 'All Fields are required' })
        }

        // Check if the email is exists or not
         const { status,existing_user } = await isUserExisting(user_email)
         if(!status){
            return res.status(404).json({ 'StatusCode': 404, 'error': `User with email ${user_email} is not exists. Please try another email !` })
         }

        // verify the user's password
       const { Status,StatusCode } = await isPasswordMatch(user_password,user_email)
       if(!Status){
            return res.status(400).json({ 'StatusCode': 400, 'message': "Password is not match. please enter a valid password" })
       }
       const userToken = await generateUserToken(existing_user?.user_id,existing_user.user_role)

      await changeUserStatusLogin(existing_user?.user_id)

      res.cookie("access_token",userToken,{
        httpOnly:true,
        secure:false,
        maxAge:24 * 60 * 60 * 1000
      })

      const user_details = {
        user_name:existing_user?.user_name,
        user_internalname:existing_user?.internal_username,
        user_email:existing_user?.user_email,
        user_role:existing_user?.user_role,
        is_active:existing_user?.is_active,
      }

       res.status(200).json({ 'StatusCode': StatusCode, 'message': "Login successful",'user_token':userToken,'existing_user':user_details })

    } catch (error) {
        console.log("Error while user login in main controller")
    }
}

// GetMe controller
export const getProfile = async(req,res) => {
    try {
        const { user_id } = req.user
        return res.status(200).json({ 'StatusCode':200, 'message': `User Login With ${user_id}` })
        
    } catch (error) {
        console.log("Error while when getting a user details")
    }
}
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
// Logout controller
export const userLogout = async(req,res) => {
    try {
        const userId = req.user.user_id
        await changeUserStatusLogout(userId)

        // const authToken = req.headers.authorization
        // req.headers.authorization = authToken.replace(authToken.split(" ")[1]," ")
        // console.log(req.headers.authorization)

        res.cookie("access_token","",{
            httpOnly:true,
            secure:true,
            maxAge:0
        })

        return res.status(200).json({ 'StatusCode': 200, 'message': 'User logout successfully' })
    } catch (error) {
        console.log("error while logout user")
    }
}