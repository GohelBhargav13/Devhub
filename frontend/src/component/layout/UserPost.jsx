import { useEffect, useState } from "react";
import { loginUserPosts } from "../../apis/post.api.js"
import toast from "react-hot-toast";
import UserAvatar from "./UserAvatar.jsx";
import { Calendar, ChevronDown, ChevronUp, Loader2, Trash } from "lucide-react"
import { deletePost } from "../../apis/post.api.js"
import { tagBadgesBg } from "../../services/tagBadge.js"

const UserPost = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading,setIsLoading] = useState(false)
  const [isShowDesc,setIsShowDesc] = useState(null)
  const [isShowLink,setIsShowLink] = useState(null)

  useEffect(() => {
    const fetchPosts = async() => {
        try {
            setIsLoading(true)
             const responseData = await loginUserPosts()
             if(!responseData?.status){
                //  toast.error(responseData?.error)
                 return
                }

                toast.success(responseData?.message)
                setAllPosts(responseData?.u_posts)
            } catch (error) {
                setIsLoading(false)
                console.log("Error while fetch the posts of the users",error)
                return
            }finally{
                setIsLoading(false)
            }   
  }
  fetchPosts()
  },[])

  // delete post handler
  const deletePostHandler = async(post_id) => {
    try {
         const responseData = await deletePost(post_id)
         if(!responseData?.status){
            toast.error(responseData?.error)
            return
         }
         setAllPosts(prev => prev.filter(post => post?.post_id !== post_id))
         toast.success(responseData?.message)
    } catch (error) {
      console.log("Error while in the delete handler in Userpost",error)
    }finally{
      console.log("post delete function is trigger")
    }
  }

  // handle a show more/less for post links
  const handleShowLink = (post_id) => {
    setIsShowLink(prev => prev === post_id ? null : post_id)
  }

  const handleShowDesc = (post_id) => {
    setIsShowDesc(prev => prev === post_id ? null : post_id)
  }

  if(isLoading){
    return (
        <div className="flex gap-2 p-1 justify-center mt-7">
          <Loader2 className="animate-spin duration-300" />
          <p className="font-bold font-mono text-[20px]">Loading Posts...</p>
        </div>
    )
  }
  return (
    <>
      {allPosts.length === 0 && (
        <div className="text-center mt-10 font-mono text-xl font-bold underline">
          No Posts Are Here..
        </div>
      )}
      <div className="grid grid-cols-3 gap-2 p-4 mt-10 text-white">
         {allPosts.map((post) =>  (
                <div className="w-fit h-fit bg-linear-to-br from-slate-800 via-slate-850 to-slate-900 rounded-lg border-2 border-slate-500 hover:scale-105 hover:duration-300 hover:border-r-4 hover:border-b-4 hover:border-r-slate-200 hover:border-b-slate-200">
                  <div className="flex flex-col gap-3 p-2">
                    <div className="flex gap-5 border-b-2 border-slate-400 p-1 rounded-xl">
                      <div>
                        <UserAvatar username={post?.user_name} size={50} />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-mono font-bold text-[17px]">
                          {post?.user_name}
                        </p>
                        <p className="font-mono font-bold text-[17px]">
                          {"@"}
                          {post?.internal_username ?? "None"}
                        </p>
                      </div>
                      <div className="flex justify-end gap-2 font-mono font-bold text-[15px] ml-auto">
                        <Calendar />
                        <p>{post?.post_at ? new Date(post?.post_at).toLocaleDateString() : "N/A"}</p>
                      </div>
                      <div>
                        <button className="cursor-pointer" onClick={() => deletePostHandler(post?.post_id)}><Trash /></button>
                      </div>
                    </div>
                   <div className="mt-1">
                      <p className="font-mono text-[16px] text-start">
                        {post?.post_desc?.length > 90 ? (
                            <>
                             { isShowDesc === post.post_id ? post.post_desc : post.post_desc.slice(0,70) + "..." }
                              <button
                                onClick={() => handleShowDesc(post.post_id)}
                                className="text-blue-500 cursor-pointer hover:text-blue-700 ml-1 font-semibold"
                              >
                                { isShowDesc === post.post_id ? "show less" : "show more"}
                              </button>
                            </>
                          ) : (
                             post?.post_desc[post?.post_desc.length-1] !== '.' ? post.post_desc + "." : post.post_desc
                          )}
                      </p>
                      <div className="mt-2">
                        <label className="font-mono text-[13px] font-bold text-slate-300">
                          You can refer this links for further information:{" "}
                        </label>
                        <div className="grid grid-cols-2">
                          {post?.post_links?.map((link, i) => (
                            <>
                            <a
                              href={link}
                              key={i}
                              className="text-blue-700 font-mono font-bold underline cursor-pointer p-1"
                              target="_blank"
                            >
                              {link.length > 40 ? (
                                <>
                                  { isShowLink === post.post_id ? link : link.slice(0, 20) + "..." }
                                </>
                              ) : (
                                link
                              )  }
                            </a>
                            { link.length > 40 && ( 
                              <button type="button" className="ml-auto" onClick={() => handleShowLink(post.post_id)}>
                                    { isShowLink === post.post_id ? <ChevronUp /> : <ChevronDown /> }
                             </button>) }
                            </>
                          ))}
                        </div>
                      </div>
                      <div className="mt-2">
                        <label className="font-mono text-[13px] font-bold text-slate-300">
                          Related Tags:
                        </label>
                        <div className={`grid grid-cols-3 gap-1 w-fit h-fit mt-1`}>
                        {post.post_tags && post?.post_tags?.map((tag,i) => (
                          <>
                            <div key={i} className="mt-1">
                              <p className={`${tagBadgesBg[i % post?.post_tags?.length]} py-1 rounded text-lg text-center`}>#{ tag }</p>
                            </div>
                          </>
                        ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
      </div>
    </>
  );
};

export default UserPost;
