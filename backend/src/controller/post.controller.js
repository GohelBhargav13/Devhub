import { addNewPost } from "../services/post.service.js"
import { fetchAllPosts,loginUserPosts,deleteAUserPost } from "../services/post.service.js"
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */

// New-post controller
export const newPostCreation = async(req,res) => {
    try {
        const { post_description,post_links,post_tags } = req.body
        if(!post_description || post_links?.length === 0 || !post_tags){
            return res.status(400).json({ StatusCode:400, message: "All fields are required" })
        }

        const user_id = req.user.user_id
        const {status,new_post} = await addNewPost(post_description,post_links,user_id,post_tags)

        if(!status){
            return res.status(400).json({ 'StatusCode':400, 'error': "New Post creation is failed" })
        }

        res.status(201).json({ 'StatusCode': 201, 'data':new_post, 'message': 'New post created' })
        
    } catch (error) {
        console.log("Error while creating a new post", error)
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
// All posts controller
export const allPosts = async(req,res) => {
    try {
        const { status,all_posts } = await fetchAllPosts()
        if(!status){
            return res.status(400).json({ 'StatusCode':400, 'message':"No Posts are there" })
        }

        res.status(200).json({ 'StatusCode':200, data: { all_posts }, 'message': "Posts are fetched" })
    } catch (error) {
        console.log("Error while fetching a all posts",error)
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
// Get user posts
export const getOnlyUserPosts = async(req,res) => {
    try {
        const { user_id } = req.user

       const { status,u_posts } =  await loginUserPosts(user_id)
       if(!status){
            return res.status(400).json({ 'StatusCode':400, 'error':'No Post Available' })
       }

       res.status(200).json({ 'StatusCode':200, 'data': { u_posts }, 'message':"Users posts are" })
    } catch (error) {
        console.log("Error while fetch only users posts",error)
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
// Delete a post controller
export const deletePostOfUser = async(req,res) => {
    try {
        const { postId } = req.params
        const current_userId = req.user.user_id

        if(!postId){
            return res.status(400).json({ 'StatusCode':400,'error':"PostId is not provided" })
        }

       const { status,deleted_postId } =  await deleteAUserPost(postId,current_userId)
        if(!status){
            return res.status(400).json({ 'StatusCode':400, 'error':"You're not authorize to delete this post" })
        }

        res.status(200).json({ 'StatusCode':200, 'data': { deleted_postId }, 'message':"Post is deleted Successfully" })
    } catch (error) {
        console.log("Error while deleting a post in main controller",error)
    }
}