import SideBar from '../component/layout/SideBar'
import { useAuthStore } from "../store/auth.store.js"
import { createNewPost } from "../apis/post.api.js"
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Trash, X } from 'lucide-react'
import { createNewQuestions } from '../apis/question.api.js'

const NewPost = () => {
  const [postDesc,setPostDesc] = useState("")
  const [currLink,setCurrLink] = useState("")
  const [postLink,setPostLink] = useState([]) 
  const [postags,setPostTags] = useState("")
  const [postQuestion,setPostQuestion] = useState("")
  const [currentForm,setCurrentForm] = useState("new-post")
  const [currentTimeDuration,setCurrentTimeDuration] = useState("10")
  const [submitLoading,setSubmitLoading] = useState(false)
  const [submitQAndALoading,setSubmitQAndALoading] = useState(false)

  const parent_comp = useRef()
  const userInfo = useAuthStore((state) => state.userData)

  // New Post api handler
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      setSubmitLoading(true)
      const responseData = await createNewPost({ post_description:postDesc, post_links:postLink, post_tags:postags })
      
      if(!responseData?.status){
        toast.error(responseData?.message || responseData?.error)
        return
      }
      toast.success(responseData?.message)
      setPostDesc("")
      setPostLink([])
      setPostTags("")
    } catch (error) {
      console.log("Error while creating a new post from the NewPost file",error)
      setSubmitLoading(false)
    }finally{
      setSubmitLoading(false)
    }

  } 

  // Q&A api handler
  const handleQAndASubmit = async(e) =>{
      e.preventDefault()
      try {
          setSubmitQAndALoading(true)
         const responseData = await createNewQuestions({ question:postQuestion,duration:currentTimeDuration })

         if(!responseData?.status){
            toast.error(responseData?.error || responseData?.message)
            return
         }

         toast.success(responseData?.message)
         setPostQuestion("")
         setCurrentTimeDuration("10")
      } catch (error) {
        console.log("Error while creating a new question post from the newPost file",error)
        setSubmitQAndALoading(false)
      }finally{
        setSubmitQAndALoading(false)
      }
  }

  // Handle a new link section
  const newLinkHandler = () => {
    if(!currLink.trim()) return

    setPostLink((prev) => [...prev,currLink])
    toast.success(`New Link ${currLink} Added`)
    setCurrLink("")
  }
  
  // Handle a delete link
  const handleDeleteLink = (index) => {
    setPostLink((prev) => prev.filter((_,i) => i !== index))
  }

  // handle a Q&A state on click
  const handleQAndA = () => {
    setCurrentForm("q&a")
  }

  // handle a new-post state on click
  const handleNewPost = () => {
    setCurrentForm("new-post")
  }

  // handle a time duration of the questions
  const handleTimeDuration = (timeDuration) => {
    setCurrentTimeDuration(timeDuration)
  }

  return (
    <div className='flex flex-row gap-5'>
        <div>
            <SideBar userData={userInfo} />
        </div>
         <div className="flex flex-col gap-3 w-full h-screen">
          <div className="text-3xl font-mono font-bold my-11 text-right mr-10">
            <p className="border-b-2 border-r-2 border-white rounded-4xl p-2 hover:border-b-4 hover:border-white px-5">
             excited to share something?,{ userInfo?.user_name.split(" ")[0]}{'📝'}
            </p>
          </div>
          <div className='flex gap-2 justify-end mr-5'>
            <button className='bg-linear-to-br from-cyan-600 via-cyan-400 to-cyan-700 p-2 font-bold font-mono rounded-xl border-t-2 border-t-white border-r-4 border-r-white border-b-4 border-b-white border-l-2 border-l-white shadow-2xl hover:duration-300 hover:border-b-2 hover:border-b-cyan-200 hover:border-r-2 hover:border-r-cyan-200 cursor-pointer' onClick={handleNewPost}>NewPost</button>
            <button className='bg-linear-to-br from-cyan-600 via-cyan-400 to-cyan-700 p-2 font-bold font-mono rounded-xl border-t-2 border-t-white border-r-4 border-r-white border-b-4 border-b-white border-l-2 border-l-white shadow-2xl hover:duration-300 hover:border-b-2 hover:border-b-cyan-200 hover:border-r-2 hover:border-r-cyan-200 cursor-pointer' onClick={handleQAndA}>Q&A</button>
          </div>
          { currentForm === 'new-post' && (
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
                 placeholder='A tags of topic for.ex(react,frontend,design)...'
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
                  disabled={ !currLink }
                  className={`text-[18px] font-mono font-bold text-white hover:shadow-2xl w-20 max-w-md p-2 rounded-lg shadow-lg transition-all text-center mt-1 ${!currLink ? "bg-gray-600 cursor-not-allowed" : "bg-linear-to-br from-cyan-700 via-cyan-400 to-cyan-700 hover:bg-cyan-600 cursor-pointer hover:border-r-white hover:border-b-2 hover:border-b-white hover:duration-300 hover:shadow-2xl transition-all hover:border-r-2"} `}
                  onClick={newLinkHandler}
                  >Add</button>
                </div>
              </div>
               { postLink?.map((post,i) => (
                  <>
                    <div className='bg-slate-700 p-2 mt-2 rounded-lg flex flex-row justify-between mr-3' key={i}>
                      <p className='font-mono text-[15px] font-bold text-white'>{ post }</p>
                      <button className='mr-4 text-white text-[18px] cursor-pointer' onClick={() => handleDeleteLink(i)}><Trash /></button>
                    </div>
                  </>
                )) }
              <button className={`text-[18px] font-mono font-bold text-white ${ !postDesc || postLink.length === 0 || !postags || submitLoading ? "bg-gray-600 cursor-not-allowed" : "bg-linear-to-br from-cyan-700 via-cyan-400 to-cyan-700 hover:bg-cyan-600 cursor-pointer hover:border-r-white hover:border-b-2 hover:border-b-white hover:duration-300 hover:shadow-2xl transition-all hover:border-r-2" } w-fit max-w-md p-3 rounded-lg shadow-lg text-center mt-3`}
              type='submit'
              disabled={ !postDesc || postLink.length === 0 || !postags || submitLoading }
              >
                { submitLoading ? "Posting..." : "Post" }
              </button>
            </form>
          </div>
          ) }
             { currentForm === 'q&a' && (
            <div className={`bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 w-130 h-fit p-5 mx-auto rounded-xl border-r-2 border-b-2 border-white`}>
            <form onSubmit={handleQAndASubmit}>
              <div className='flex flex-col gap-4'>
                <label className='text-xl font-mono font-bold text-cyan-300 border-b-4 border-white rounded-lg py-2 border-r-2 px-2'>Question</label>
                <textarea
                 name='post_desc'
                 rows={5}
                 placeholder='A question what you want to ask...'
                 value={postQuestion}
                 onChange={(e) => setPostQuestion(e.target.value)}
                 className='border-2 border-white p-2 rounded-lg hover:border-r-2 hover:border-r-cyan-400 hover:border-b-2 hover:border-b-cyan-400 hover:duration-300 outline-none'
                ></textarea>
              </div>
              <div className='flex flex-col gap-4'>
                <label className='text-xl font-mono font-bold text-cyan-300 border-b-4 border-white rounded-lg py-2 border-r-2 px-2'>Duration</label>
                <div className='flex gap-2 justify-center border-2 border-white rounded-xl p-2 w-full h-full bg-slate-900'>
                    <div className='flex flex-col border-2 border-slate-400 p-1 rounded-3xl'>
                      <label className='text-[15px] font-mono font-bold text-cyan-300 border-white rounded-lg py-2 px-2 shadow-2xl'>10 mins</label>
                      <input type='checkbox' className='accent-cyan-700' onChange={() => handleTimeDuration("10")} checked={currentTimeDuration === '10'}/>
                    </div>
                    <div className='flex flex-col border-2 border-slate-400 p-1 rounded-3xl'>
                      <label className='text-[15px] font-mono font-bold text-cyan-300 border-white rounded-lg py-2 px-2 shadow-2xl'>20 mins</label>
                      <input type='checkbox' className='accent-cyan-700' onChange={() => handleTimeDuration("20")} checked={currentTimeDuration === '20'}/>
                    </div>
                    <div className='flex flex-col border-2 border-slate-400 p-1 rounded-3xl'>
                      <label className='text-[15px] font-mono font-bold text-cyan-300 border-white rounded-lg py-2 px-2 shadow-2xl'>30 mins</label>
                      <input type='checkbox' className='accent-cyan-700' onChange={() => handleTimeDuration("30")} checked={currentTimeDuration === '30'}/>
                    </div>
                </div>
              </div>
              <button className={`text-[18px] font-mono font-bold text-white ${ !postQuestion || !currentTimeDuration || submitQAndALoading ? "bg-gray-600 cursor-not-allowed" : "bg-linear-to-br from-cyan-700 via-cyan-400 to-cyan-700 hover:bg-cyan-600 cursor-pointer hover:border-r-white hover:border-b-2 hover:border-b-white hover:duration-300 hover:shadow-2xl transition-all hover:border-r-2" } w-fit max-w-md p-2 rounded-lg shadow-lg text-center mt-3`}
              type='submit'
              disabled={ !postQuestion || !currentTimeDuration || submitQAndALoading }
              >
                { submitQAndALoading ? "Creating..." : "Create" }
              </button>
            </form>
          </div>
          ) }
          </div>
    </div>
  )
}

export default NewPost