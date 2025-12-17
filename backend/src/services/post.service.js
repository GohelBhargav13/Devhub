import { postTable,userTable } from "../models/index.js"
import { db } from "../db_config/db_config_postgres.js"
import { eq } from "drizzle-orm"

// New Post function
export const addNewPost = async(...postDetails) => {
    const [post_description,post_link,user_id] = postDetails
    try {
        const [new_post] = await db.insert(postTable).values({
            post_description,
            post_link,
            user_id
        }).returning({
            new_post_id:postTable.post_id
        })

        if(new_post){
            return { 'status': true, 'new_post':new_post }
        }
        return { 'status': false, 'new_post':null }
    } catch (error) {
        console.log("Error while adding a post details using the function",error)
    }
}

// fecth all posts function
export const fetchAllPosts = async() => {
    try {
        const all_available_posts = await db.select({
            post_desc:postTable.post_description,
            post_link:postTable.post_link,
            post_at:postTable.created_at,
            user_name:userTable.user_name
        }).from(postTable).rightJoin(userTable, eq(userTable.user_id,postTable.user_id))

        if(all_available_posts.length === 0){
            return { 'status':false, 'all_posts':null }
        }

        return { 'status':true, 'all_posts':all_available_posts }
    } catch (error) {
        console.log("error while fetching the all posts in fucntion")
    }
}

// get login user posts
export const loginUserPosts = async (user_id) => {
    try {

        const users_post = await db.select({
            post_desc:postTable.post_description,
            post_link:postTable.post_link,
            post_at:postTable.created_at,
            user_name:userTable.user_name,
        }).from(postTable).leftJoin(userTable,eq(postTable.user_id,user_id)).where(eq(userTable.user_id,user_id))

        if(users_post.length === 0){
            return { 'status':false, 'u_posts':null }
        }

        return { 'status':true, 'u_posts':users_post }
    } catch (error) {
        console.log("Error while fetching a user specific posts",error)
    }
}