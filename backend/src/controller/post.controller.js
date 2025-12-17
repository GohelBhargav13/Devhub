import { addNewPost } from "../services/post.service.js"
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */

// New-post controller
export const newPostCreation = async(req,res) => {
    try {
        const { post_description,post_link } = req.body

        if(!post_description || !post_link){
            return res.status(400).json({ StatusCode:400, message: "All fields are required" })
        }

        const user_id = req.user.user_id
        const {status,new_post} = await addNewPost(post_description,post_link,user_id)

        if(!status){
            return res.status(400).json({ 'StatusCode':400, 'error': "New Post creation is failed" })
        }

        res.status(201).json({ 'StatusCode': 201, 'data':new_post, 'message': 'New post created' })
        
    } catch (error) {
        console.log("Error while creating a new post", error)
    }
}