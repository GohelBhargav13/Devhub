import jwt from "jsonwebtoken"
import { db } from "../db_config/db_config_postgres.js"
import { userTable } from "../models/index.js"
import { eq } from "drizzle-orm"

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

// autorization token middleware
export const checkTokenExists = async(req,res,next) => {
    try {

        // const authHeaders = req.headers.authorization
        console.log(req.cookies?.access_token)
        const user_access_token = req.cookies?.access_token

        console.log(user_access_token)
        if(!user_access_token){
            next()
        }

        // if(!authHeaders){
        //     return next()
        // }

        // if(!authHeaders.startsWith('Bearer')){
        //     return res.status(404).json({ StatusCode:404, 'error':'Bearer token is not found' })
        // }

        // const original_token = authHeaders.split(" ")[1]
        // if(!original_token){
        //     next()
        // }

       const decoded = jwt.verify(user_access_token,process.env.JWT_SECRET)
       const [user_details] = await db.select().from(userTable).where(eq(userTable.user_id,decoded.user_id))


       req.user = user_details

       next()
        
    } catch (error) {
        console.log("Error while authenticate using a bearer token",error)
    }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */

// ensuresAuthenticate User
export const ensureUserAuthenticate = async (req,res,next) => {
    try {
        const user = req.user
        if(!user){
            return res.status(401).json({ StatusCode:401, 'message': 'User is not Authenticated' })
        }

        next()
    } catch (error) {
        console.log("Error while authenticating the user",error)
    }
}