import SideBar from '../component/layout/SideBar'
import { useAuthStore } from "../store/auth.store.js"
import { createNewPost } from "../apis/post.api.js"
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

const NewPost = () => {
  const [postDesc,setPostDesc] = useState("")
  const [postLink,setPostLink] = useState([])
  const [currLink,setCurrLink] = useState("")
  const [postags,setPostTags] = useState("")
  const [submitLoading,setSubmitLoading] = useState(false)

  const parent_comp = useRef()
  const userInfo = useAuthStore((state) => state.userData)

  // New Post api handler
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      setSubmitLoading(true)
      const responseData = await createNewPost({ post_description:postDesc, post_link:currLink, post_tags:postags })
      
      if(!responseData?.status){
        toast.error(responseData?.message || responseData?.error)
        return
      }
      toast.success(responseData?.message)
      setPostDesc("")
      setCurrLink("")
      setPostTags("")
    } catch (error) {
      console.log("Error while creating a new post from the NewPost file",error)
      setSubmitLoading(false)
    }finally{
      setSubmitLoading(false)
    }

  } 

  // Handle a new link section
  const newLinkHandler = () => {
    console.log({ currLink,postLink })
    setPostLink(prev => [currLink,...prev])
    console.log({ currLink,postLink })

    setCurrLink("")
    const input = document.createElement('input')
    input.type = 'text'
    input.style = 'border:2px solid white;padding:8px;border-radius:10px'
    input.placeholder = 'Add Related Link...'
    input.value = ""
    input.value = currLink

    input.addEventListener("change", function(e){
        setCurrLink(e.target.value)
    })
  
    console.log(postLink)
    parent_comp.current.appendChild(input)
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
          <div className={`bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 w-130 h-fit p-5 mx-auto rounded-xl border-r-2 border-b-2 border-white`}>
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
              <div className='flex flex-col gap-4'>
                <label className='text-xl font-mono font-bold text-cyan-300 border-b-4 border-white rounded-lg py-2 border-r-2 px-2'>Post Tags</label>
                <textarea
                 name='post_tags'
                 rows={2}
                 placeholder='A tags of topic react,frontend,design...'
                 value={postags}
                 onChange={(e) => setPostTags(e.target.value)}
                 className='border-2 border-white p-2 rounded-lg hover:border-r-2 hover:border-r-cyan-400 hover:border-b-2 hover:border-b-cyan-400 hover:duration-300 outline-none'
                ></textarea>
              </div>
               <div className='flex flex-col gap-4 mt-8' ref={parent_comp}>
                <label className='text-xl font-mono font-bold text-cyan-300 border-b-4 border-white rounded-lg py-2 border-r-2 px-2'>Related Links</label>
                <div className='flex flex-row gap-2 w-full'>
                  <input 
                  name='post_links'
                  id='post_links'
                  placeholder='Add Related Link...'
                  value={currLink}
                  onChange={(e) => setCurrLink(e.target.value) }
                  className='border-2 border-white p-2 rounded-lg hover:border-r-2 hover:border-r-cyan-400 hover:border-b-2 hover:border-b-cyan-400 hover:duration-300 outline-none w-100'
                  />
                  <button 
                  type='button'
                  disabled={true}
                  className='text-[18px] font-mono font-bold text-white hover:shadow-2xl w-20 max-w-md p-2 rounded-lg shadow-lg transition-all text-center mt-1 hover:duration-300 cursor-not-allowed bg-gray-600'
                  onClick={newLinkHandler}
                  >Add</button>
                </div>
              </div>
               { postLink.map((post) => (
                  <div key={post}>{ post }</div>
                )) }
              <button className={`text-[18px] font-mono font-bold text-white ${ !postDesc || !currLink || !postags || submitLoading ? "bg-gray-600 cursor-not-allowed" : "bg-linear-to-br from-cyan-700 via-cyan-400 to-cyan-700 hover:bg-cyan-600 cursor-pointer hover:border-r-white hover:border-b-2 hover:border-b-white hover:duration-300 hover:shadow-2xl transition-all hover:border-r-2" } w-fit max-w-md p-3 rounded-lg shadow-lg text-center mt-3`}
              type='submit'
              disabled={ !postDesc || !postLink || !postags || submitLoading }
              >
                { submitLoading ? "Posting..." : "Post" }
              </button>
            </form>
          </div>
          </div>
    </div>
  )
}

export default NewPost