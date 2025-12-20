import SideBar from '../component/layout/SideBar'
import { useAuthStore } from "../store/auth.store.js"
import { createNewPost } from "../apis/post.api.js"
import { useState } from 'react'
import toast from 'react-hot-toast'

const NewPost = () => {
  const [postDesc,setPostDesc] = useState("")
  const [postLink,setPostLink] = useState("")

  const userInfo = useAuthStore((state) => state.userData)

  // New Post api handler
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const responseData = await createNewPost({ post_description:postDesc, post_link:postLink })
      
      if(!responseData?.status){
        toast.error(responseData?.error)
        return
      }
      toast.success(responseData?.message)
    } catch (error) {
      console.log("Error while creating a new post from the NewPost file",error)
    }

  } 
  return (
    <div className='flex flex-row gap-5'>
        <div>
            <SideBar userData={userInfo} />
        </div>
         <div className="flex flex-col gap-3 w-full h-screen overflow-y-scroll">
          <div className="text-3xl font-mono font-bold my-11 text-right mr-10">
            <p className="border-b-2 border-r-2 border-white rounded-4xl p-2 hover:border-b-4 hover:border-white px-5">
             excited to share something?,{ userInfo?.user_name.split(" ")[0]}{'📝'}
            </p>
          </div>
          <div className='bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 w-115 h-110 p-5 mx-auto rounded-xl border-r-2 border-b-2 border-white'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-4'>
                <label className='text-xl font-mono font-bold text-cyan-300 border-b-4 border-white rounded-lg py-2 border-r-2 px-2'>Post Description</label>
                <textarea
                 name='post_desc'
                 rows={5}
                 placeholder='A Short description of topic...'
                 value={postDesc}
                 onChange={(e) => setPostDesc(e.target.value)}
                 className='border-2 border-white p-2 rounded-lg hover:border-r-2 hover:border-r-cyan-400 hover:border-b-2 hover:border-b-cyan-400 hover:duration-300 outline-none'
                ></textarea>
              </div>
               <div className='flex flex-col gap-4 mt-8'>
                <label className='text-xl font-mono font-bold text-cyan-300 border-b-4 border-white rounded-lg py-2 border-r-2 px-2'>Related Links</label>
                <input 
                name='post_links'
                id='post_links'
                placeholder='Add Related Link...'
                value={postLink}
                onChange={(e) => setPostLink(e.target.value) }
                className='border-2 border-white p-2 rounded-lg hover:border-r-2 hover:border-r-cyan-400 hover:border-b-2 hover:border-b-cyan-400 hover:duration-300 outline-none'
                />
              </div>
              <button className='text-[18px] font-mono font-bold text-white bg-cyan-500 bg-linear-to-br from-cyan-700 via-cyan-400 to-cyan-700 hover:bg-cyan-600 cursor-pointer hover:shadow-2xl w-fit max-w-md p-3 rounded-lg shadow-lg transition-all text-center mt-3 hover:border-r-2 hover:border-r-white hover:border-b-2 hover:border-b-white hover:duration-300'
              type='submit'
              >
                Submit
              </button>
            </form>
          </div>
          </div>
    </div>
  )
}

export default NewPost