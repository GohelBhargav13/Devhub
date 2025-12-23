import { randomBytes,createHmac } from "node:crypto"
import jwt from "jsonwebtoken"
import "dotenv/config"

// Hash Generator function
export const userPasswordHash = async (user_password) => {
    try {
        if(!user_password){
            return { 'StatusCode': 400, 'error': "Password is not recevied" }
        }

        const salt = randomBytes(32).toString("hex")
        const hashed_password = createHmac("sha256",salt).update(user_password).digest("hex")

        return { salt, hashed_password }
        
    } catch (error) {
        console.log("Error while creating a hash of the user's password")
    }
}

// JSONWEBTOKEN for the user authentication
export const generateUserToken = async(user_id,user_role) => {
    try {
        
        const userToken = jwt.sign({ user_id,user_role },process.env.JWT_SECRET,{ expiresIn:'24h' })
        return userToken

    } catch (error) {
        console.log("Error while generating a user token for the login")
    }
}

// generate a email token for the verification
export const emailTokenGenerator = async() => {
    try {
        return randomBytes(32).toString("hex")
    } catch (error) {
        console.log("Error while creating a email verification token",error)
    }
}