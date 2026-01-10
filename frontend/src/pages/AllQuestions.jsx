import { useEffect, useState } from "react"
import SideBar from "../component/layout/SideBar"
import UserAvatar from "../component/layout/UserAvatar.jsx"
import { useAuthStore } from "../store/auth.store.js"
import { fetchAllQuestionsApi,createNewCommentOnQues } from "../apis/question.api.js"
import { Loader2, Redo2, Ellipsis } from "lucide-react"
import toast from "react-hot-toast"
import QuesComment from "../component/layout/QuesComment.jsx"
import { socket } from "../server/server.js"

const AllQuestions = () => {
    const userInfo = useAuthStore((state) => state.userData)
    const [isLoading,setIsLoading] = useState(false)
    const [isCommenting,setIsCommenting] = useState(false)
    const [commentText,setCommentText] = useState("")
    const [commentTextId,setCommentTextId] = useState("")
    const [allQuestions,setAllQuestions] = useState([])

    useEffect(() => {
        // fetch all questions
        const fetchQuestions = async() => {
          try {
            setIsLoading(true)
             const response = await fetchAllQuestionsApi()
             if(!response?.status){
                  toast.error(response?.error)
                  return
             }
            //  toast.success(response?.message)
             setAllQuestions(response?.data)
          } catch (error) {
            setIsLoading(false)
             console.log("Error while fetching all questions",error)
          }finally{
            setIsLoading(false)
          }
        }
        fetchQuestions()
    },[])

    // Handle a question comments
    const handleACommentOnQuestion = async(que_id) => {
        try {
            if (!commentText) return
           setIsCommenting(true)
           const response = await createNewCommentOnQues({ que_id,comment_text:commentText })
           if(!response?.status){
              toast.error(response?.error)
              return
           }
        //    toast.success(response?.message)
           setCommentText("")
           console.log(socket?.connected)
            // Check socket connection before emitting
            if (socket?.connected) {
                socket.emit("newComment", { 
                    que_id: que_id,
                    comment_details: response?.comment_details 
                })
            } else {
                console.warn("Socket is not connected")
            }
        } catch (error) {
            setIsCommenting(false)
            console.log("Error while commenting from the main file",error)
        }finally{
            setIsCommenting(false)
        }
    }

    // handle a mouse over for comment section
    const handleMouseOver = (que_id) => {
        setCommentTextId(que_id)
    }

  return (
    <div className='flex flex-row gap-5'>
        <div>
            <SideBar userData={userInfo} />
        </div>
        <div className="flex flex-col">
            <div className="w-full h-auto bg-slate-950 text-end p-8 mt-4 rounded-4xl border-2 border-cyan-100">
                <h2 className="font-mono font-bold text-[21px] border-b-2 border-r-2 border-l-2 rounded-xl p-2 hover:border-b-4 hover:border-cyan-500 hover:scale-95 hover:cursor-pointer hover:duration-300">You find something interesting here, { userInfo?.user_name }</h2>
            </div> 
            <div className="grid grid-cols-3 py-10 gap-10">
                { isLoading && (
                    <div className="w-full h-full justify-items-center">
                        <Loader2 className="animate-spin duration-700 ease-in" />
                    </div>
                )}
                {allQuestions.length === 0 && !isLoading && (
                    <div className="font-mono font-bold w-full h-full justify-items-center">
                        <p>No questions are there....</p>
                    </div>
                )}

                {/* All comments are here */}
                { allQuestions.length > 0 && allQuestions.map((que,i) => (
                    <div key={que?.question_id} className="bg-slate-800 w-fit h-fit p-2 rounded-lg border-2 border-slate-300/80">
                    <div className="flex flex-col gap-1">
                        <p className="flex justify-end font-bold font-mono text-[17px]">{ new Date() < new Date(que?.question_duration) ? ( <>Till { new Date(que?.question_duration).toLocaleString()} open </> ) : <p className="text-[13px] "> closed </p> } </p>
                        <div className="bg-slate-950/80 w-full h-full p-5 text-justify font-bold font-mono rounded-lg border-2 border-slate-400/80 mb-2">
                        <div className="bg-slate-900 border-2 p-2 rounded-xl border-white flex">
                            <div><UserAvatar username={que?.user_name} /></div>
                            <div className="p-2">
                                <p>{ que?.user_name }</p>
                            </div>
                        </div>
                        <p className="mt-3">{ que?.question_text }</p>
                        </div> 
                        {/* Total no.of comments are */} 
                        <QuesComment question_id={que?.question_id} />
                    </div>
                    { 
                        new Date() < new Date(que?.question_duration) && (
                        <div className="flex gap-2 mt-1">
                            <textarea className="w-full h-full border-2 border-slate-400/80 rounded-xl p-2" rows={1} cols={4} value={que?.question_id === commentTextId ? commentText : ""} onChange={(e) => setCommentText(e.target.value)} placeholder="Add a comment..." onMouseOver={() => handleMouseOver(que?.question_id)} />
                            <button className={`${!commentText && que?.question_id === commentTextId ? "bg-slate-500 cursor-not-allowed" : "bg-slate-950 hover:cursor-pointer border-r-2 border-r-slate-400/80 border-b-2 border-b-slate-400/80 hover:border-r-2 hover:border-r-white hover:border-b-2 hover:border-b-white hover:duration-700 cursor-pointer"} p-1.5 rounded-xl`} disabled={!commentText} onClick={() => handleACommentOnQuestion(que?.question_id)}>
                                { isCommenting && que?.question_id === commentTextId ? <Ellipsis /> : <Redo2 /> }
                            </button>
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AllQuestions