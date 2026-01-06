import { postTable,savepostusers,userTable } from "../models/index.js"
import { db } from "../db_config/db_config_postgres.js"
import { and, desc, eq } from "drizzle-orm"

// New Post function
export const addNewPost = async(...postDetails) => {
    const [post_description,post_links,user_id,post_tags] = postDetails
    const post_tags_array = post_tags.split(",")

    try {
        const [new_post] = await db.insert(postTable).values({
            post_description,
            post_links,
            user_id,
            post_tags:post_tags_array
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
            post_id:postTable.post_id,
            post_desc:postTable.post_description,
            post_links:postTable.post_links,
            post_at:postTable.created_at,
            user_name:userTable.user_name,
            internal_username:userTable.internal_username,
            post_tags:postTable.post_tags
        }).from(postTable).innerJoin(userTable, eq(userTable.user_id,postTable.user_id)).orderBy(desc(postTable.created_at))

        if(all_available_posts.length === 0){
            return { 'status':false, 'all_posts':null }
        }

        return { 'status':true, 'all_posts':all_available_posts }
    } catch (error) {
        console.log("error while fetching the all posts in fucntion")
    }
}

// get login user posts function
export const loginUserPosts = async (user_id) => {
    try {

        const users_post = await db.select({
            post_id:postTable.post_id,
            post_desc:postTable.post_description,
            post_links:postTable.post_links,
            post_at:postTable.created_at,
            user_name:userTable.user_name,
            internal_username:userTable.internal_username,
            post_tags:postTable.post_tags
        }).from(postTable).leftJoin(userTable,eq(postTable.user_id,user_id)).where(eq(userTable.user_id,user_id))

        if(users_post.length === 0){
            return { 'status':false, 'u_posts':null }
        }

        return { 'status':true, 'u_posts':users_post }
    } catch (error) {
        console.log("Error while fetching a user specific posts",error)
    }
}

// Delete post function
export const deleteAUserPost = async(post_id,user_id) => {
    try {
        const [deleted_post] = await db.delete(postTable).where(and(eq(postTable.post_id,post_id), eq(postTable.user_id,user_id))).returning({
            deleted_postId:postTable.post_id
        })

        if(deleted_post){
            return { 'status':true, 'deleted_postId':deleted_post }
        }

        return { 'status':false, 'deleted_postId':null }
    } catch (error) {
        console.log("Error while deleting a user post in the service function",error)
    }
}

// Add a new record in the savepostuser table
export const createNewUserPostSave = async(post_id,user_id) => {
    try {

        const [ post ] = await db.select({
            post_id:postTable.post_id
        }).from(postTable).where(eq(postTable.post_id,post_id))

       const [response] = await db.select({
            record_id:savepostusers.id
        }).from(savepostusers).where(and(eq(savepostusers.user_id,user_id),eq(savepostusers.post_id,post_id)))

        if(response?.record_id){
            return { 'status':false, 'error':'Post is already saved' }
        }

        if(!post){
            return { 'status':false, 'error':"Post is not found" }
        }

        const [newRecord] = await db.insert(savepostusers).values({
            post_id:post_id,
            user_id:user_id
        }).returning({
            new_id:savepostusers.id
        })

        if(!newRecord){
            return { 'status':false, 'new_record_id':null}
        }

        return { 'status':true, 'new_record_id':newRecord.new_id }
        
    } catch (error) {
        console.log("Error while insert a record into the database of the saveuserpost in services",error)
    }
}

// Delete a record from the savepostuser table
export const deleteRecordUserPostSave = async (post_id,user_id) => {
  try {
    const [post] = await db
      .select({
        post_id: postTable.post_id,
      })
      .from(postTable)
      .where(eq(postTable.post_id, post_id));

    if (!post) {
      return { status: false, error: "Post is not found" };
    }

    const [deleted] = await db
      .delete(savepostusers)
      .where(
        and(
          eq(savepostusers.post_id, post_id),
          eq(savepostusers.user_id, user_id),
        ),
      )
      .returning({ record_id: savepostusers.id });

    if (!deleted) {
      return {
        status: false,
        error: "Save post record not found for this user",
        del_record_id: null,
      };
    }

    return {
      status: true,
      message: "Post removed from your saved posts",
      del_record_id: deleted.record_id,
    };
  } catch (error) {
    console.log("Error while remove a save post from services", error);
    return { status: false, error: "Internal server error" };
  }
};

// fetch login users all save posts
export const userAllSavedPostsService = async (user_id) => {
    try {
        const usersSavePost = await db.select({
            id:savepostusers.id,
            user_name:userTable.user_name,
            user_internal_name:userTable.internal_username,
            post_desc:postTable.post_description,
            post_id:postTable.post_id,
            created_at:postTable.created_at,
            post_links:postTable.post_links,
            post_tags:postTable.post_tags
        }).from(savepostusers).innerJoin(postTable,eq(postTable.post_id,savepostusers.post_id)).innerJoin(userTable,eq(userTable.user_id,postTable.user_id)).where(eq(savepostusers.user_id,user_id))

        if(usersSavePost.length === 0){
            return { 'status':false, 'error': "No saved post by user" }
        }

        return { 'status':true, 'user_posts':usersSavePost, 'message':"user posts fetched" }
    } catch (error) {
        console.log("Error while fetch users save post from services",error)
    }
}
