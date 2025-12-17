import { createNewUser,isPasswordMatch,isUserExisting } from  "../services/user.service.js"
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
            return res.status(400).json({ 'error': `${user_email} is already exists` })
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

// Login controller
export const userLogin = async (req,res) => {
    try {
        const { user_email,user_password } = req.body
            
        // All fields validation
        if(!user_email || !user_password){
            return  res.status(400).json({ 'message': 'All Fields are required' })
        }

        // Check if the email is exists or not
         const { status,existing_user } = await isUserExisting(user_email)
         if(!status){
            return res.status(404).json({ 'StatusCode': 404, 'error': `User with email ${user_email} is not exists. Please try another email !` })
         }

        // verify the user's password
       const { Status,StatusCode } = await isPasswordMatch(user_password,user_email)
       if(!Status){
            return res.status(400).json({ 'StatusCode': StatusCode, 'message': "Password is not match. please enter a valid password" })
       }
       const userToken = await generateUserToken(existing_user?.user_id)

       res.status(200).json({ 'StatusCode': StatusCode, 'message': "Login successful",'user_token':userToken })

    } catch (error) {
        console.log("Error while user login in main controller")
    }
}

// GetMe controller
export const getProfile = (req,res) => {
    try {
        const { user_id } = req.user
        return res.status(200).json({ 'StatusCode':200, 'message': `User Login With ${user_id}` })
        
    } catch (error) {
        console.log("Error while when getting a user details")
    }
}