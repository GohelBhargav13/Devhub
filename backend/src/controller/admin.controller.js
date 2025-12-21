import { eq } from "drizzle-orm"
import { db } from "../db_config/db_config_postgres.js"
import { userTable,postTable } from "../models/index.js"

// Total users count controller
export const allUsersCount = async(req,res) => {
    try {

        const user_counts = await db.select({
            users_id:userTable.user_id
        }).from(userTable) 
        const total_users = user_counts.length

        return res.status(200).json({ 'StatusCode': 200, 'total_users': total_users })       
    } catch (error) {
        console.log("Error while fetching all users count",error)   
    }
}

// Total posts count controller
export const allPostCount = async(req,res) => {
    try {

        const post_counts = await db.select({
            posts_id:postTable.post_id
        }).from(postTable)
        const posts_count = post_counts.length

        return res.status(200).json({ 'StatusCode': 200, 'total_posts': posts_count })
    } catch (error) {
        console.log("Error while fetching all posts count",error)
    }
}

// Total active users on the platform controller
export const allActiveUsers = async(req,res) => {
    try {
        const active_users = await db.select().from(userTable).where(eq(userTable.is_active,true))
        return res.status(200).json({ 'StausCode':200, 'total_active_users':active_users.length })

    } catch (error) {
        console.log("Error while fetching a active user count",error)
    }
}

// Total users on the platform controller
export const totalUsersDetails = async(req,res) => {
    try {

       const user_with_posts = await db.select({
            user_id:userTable.user_id,
            user_name:userTable.user_name,
            join_at:userTable.created_at,
        }).from(userTable).leftJoin(postTable,eq(postTable.user_id,userTable.user_id)).groupBy(userTable.user_id)

        res.status(200).json({ 'StatusCode':200,user_with_posts })
        
    } catch (error) {
        console.log("Error while fetching total users details",error)
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
// get all users controller
export const allUsersDetails = async(req,res) => {
    try {

        const all_user_details = await db.select({
            user_id:userTable.user_id,
            user_name:userTable.user_name,
            user_email:userTable.user_email,
            user_internal_name:userTable.internal_username,
            created_at:userTable.created_at,
            user_role:userTable.user_role
        }).from(userTable)

        if(all_user_details.length === 0){
            return res.status(400).json({ 'StatusCode':400, 'error': "No users are there" })
        }

        res.status(200).json({ 'StatusCode':200, 'message':"Users fetched", all_user_details })
        
    } catch (error) {
        console.log("error while fetching a users data",error)
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
// get all posts controller
export const allPostDetails = async(req,res) => {
    try {

       const all_posts_with_users = await db.select({
            post_id:postTable.post_id,
            post_desc:postTable.post_description,
            user_id:userTable.user_id,
            user_name:userTable.user_name,
            user_internal_name:userTable.internal_username
        }).from(postTable).leftJoin(userTable,eq(userTable.user_id,postTable.user_id))

        if(all_posts_with_users.length === 0){
            return res.status(400).json({ 'StatusCode':400, 'message': "No Posts are there" })
        }

        res.status(200).json({ 'StatusCode':200, 'message': "Posts Fetched", all_posts_with_users })
        
    } catch (error) {
        console.log("Error while fetch the post in the controller all",error)
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
// delete user controller
export const userDelete = async(req,res) => {
    try {
        const { userId } = req.params

        res.cookie("access_token","",{
            httpOnly:true,
            secure:true,
            maxAge:0
        })

       const [deleted_user] = await db.delete(userTable).where(eq(userTable.user_id,userId)).returning({
            user_id:userTable.user_id,
            user_name:userTable.user_name
        })

        if(!deleted_user){
            return res.status(400).json({ 'StatusCode':400, 'error': "User is not deleted" })
        }

        res.status(200).json({ 'StatusCode':200, 'message': "User deleted successfully", 'data':deleted_user })
        
    } catch (error) {
        console.log("Error in the user-delete controller",error)
    }
}