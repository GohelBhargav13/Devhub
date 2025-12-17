import { postTable } from "../models/index.js"
import { db } from "../db_config/db_config_postgres.js"

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