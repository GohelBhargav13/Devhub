import { useEffect, useState } from "react";
import { deleteQuestionComment, fetchQuestionsComment } from "../../apis/question.api.js";
import toast from "react-hot-toast";
import { useAuthStore } from "../../store/auth.store.js"
import { Loader2, Trash } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { socket } from "../../server/server.js";

const QuesComment = ({ question_id }) => {
    const [isShow,setIsShow] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [totalComments,setTotalComments] = useState([])
    const userInfo = useAuthStore((state) => state.userData)
    useEffect(() => {
        // fetch the users comment based on the question_id
        const fetchQuesComments = async() => {
            try {
                setIsLoading(true)
                const response = await fetchQuestionsComment(question_id)
                if(!response?.status){
                    toast.error(response?.error)
                    return
                }

                // toast.success(response?.message)
                setTotalComments(response?.data)
                
            } catch (error) {
                setIsLoading(false)
                console.log("Error while fetch a comments",error)
            }finally {
                setIsLoading(false)
            }
        }

        fetchQuesComments()

        // socket of the new-comments
        socket.on("newUserComment",async({ que_id,message,comment_details }) => {
           console.log(comment_details)
            if(que_id === question_id && comment_details){
                setTotalComments(prev => [...prev,comment_details])
                if(message && comment_details?.user_name === userInfo?.user_name) toast.success(message)
            }
        })

        // unmount the sockets
        return () => {
            socket.off("newUserComment")
        }
    },[question_id])

    // Handle a comment show/off
    const handleCommentShow = () => {
        setIsShow(prev => !prev)
    }

    // delete comment handler
    const deleteAComment = async(com_id) => {
        try {
            const response = await deleteQuestionComment(com_id)
            if(!response?.status){
                toast.error(response?.error)
                return
            }

            toast.success(response?.message)
            setTotalComments(prev => prev.filter(com => com?.comment_id !== com_id))
        } catch (error) {
            console.log("Error while deleting a comment from main file",error)
        }
    }
  return (
    <>
      {/* Total no.of comments are */}
      { isLoading && (
        <div className="w-full h-full justify-items-center">
            <Loader2 className="animate-spin duration-500 ease-in" />
        </div>
      )}
      { totalComments.length === 0 && !isLoading && (
            <div className="w-full h-full justify-items-center">
                <p className="text-center font-bold font-mono text-[13px]">No Comments are there</p>
            </div>
      )}
      <div>
        {!isShow && totalComments.length > 0 ? (
          <>
            <div className="flex w-full gap-2 p-1 mb-3 rounded-3xl bg-slate-950/60">
              <div className="ml-2 mt-1">
                 <UserAvatar username={totalComments[0]?.user_name} size={30} />
              </div>
              <div className="flex flex-col gap-0.5 text-[12px]">
                <p className="font-bold font-mono">{totalComments[0]?.user_name}</p>
                <p className="font-mono">{totalComments[0]?.comment_text}</p>
              </div>
              {userInfo?.user_internalname === totalComments[0]?.user_internal_name && (
                <div className="p-1 cursor-pointer hover:shadow-2xl" onClick={() => deleteAComment(totalComments[0]?.comment_id)}>
                    <Trash size={18} />
              </div>    
              )}
            </div>
          </>
        ) : (
          totalComments.map((com, i) => (
            <>
              <div
                key={com?.com_id}
                className="flex gap-2 p-1 mb-3 rounded-3xl bg-slate-950/60"
              >
                <div className="ml-2 mt-1">
                  <UserAvatar username={com?.user_name} size={30} />
                </div>
                <div className="flex flex-col gap-0.5 text-[12px]">
                  <p className="font-bold font-mono">{com?.user_name}</p>
                  <p className="font-mono">{com?.comment_text}</p>
                </div>
                {userInfo?.user_internalname === totalComments[0]?.user_internal_name && (
                    <div className="p-1 cursor-pointer hover:shadow-2xl" onClick={() => deleteAComment(com?.comment_id)}>
                        <Trash size={18} />
                </div>    
              )}
              </div>
            </>
          ))
        )}
      </div>
       { totalComments.length > 1 && (
             <button className="text-[12px] w-full text-end text-blue-700 hover:underline cursor-pointer" onClick={handleCommentShow}>{totalComments.length - 1}+ { isShow ? "less" : "more" }</button>
       )}
    </>
  );
};

export default QuesComment;
