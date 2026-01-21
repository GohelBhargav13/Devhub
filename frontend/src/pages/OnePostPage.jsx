import { useParams,useNavigate } from "react-router-dom"
import { Home,Loader2,ToggleLeft,ToggleRight } from "lucide-react"
import { useEffect, useState } from "react"
import { fetchPostById } from "../apis/post.api"
import toast from "react-hot-toast"
import UserAvatar from "../component/layout/UserAvatar"
import { tagBadgesBg } from "../services/tagBadge"

const OnePostPage = () => {
    const { postId } = useParams()
    const [postData,setPostData] = useState({})
    const [postLinkLimit,setPostLinkLimit] = useState(2)
    const [postTagsLimit,setPostTagsLimit] = useState(2)
    const navigate = useNavigate()

    // call the useEffect by postId
    useEffect(() => {
        const fetchById = async() => {
           const response = await fetchPostById(postId)
           if(!response.status){
                toast.error(response?.error)
                return
           }
           toast.success(response?.message)
           setPostData(typeof response?.post_details === "object" ? response?.post_details : {})
        }

        fetchById()
    },[postId])

    // handle a link view toggle
    const handleLinkViewToggle = () => {
        setPostLinkLimit(prev => prev === demo_links.length ? 2 : demo_links.length)
    }

    // handle a tag view toggle
    const handleTagsViewToggle = () => {
        setPostTagsLimit(prev => prev === postData?.post_tags?.length ? 2 : postData?.post_tags?.length)
    }

  return (
    <>
    { !postData ? ( <Loader2 className="animate-spin w-full h-full justify-items-center" /> ) : (
        <div className="flex flex-col gap-5 p-5">
            <div>
                <button className="flex p-4 gap-1 rounded-xl bg-linear-to-br border-t-2 border-l-4 border-r-4 border-b-4 hover:border-r-2 hover:border-b-2 hover:border-l-2 hover:cursor-pointer hover:duration-500 border-slate-700 from-slate-900 via-slate-950 to-black/30" onClick={() => navigate("/")}><Home /> Home</button>
            </div>
            <div className="bg-linear-to-br from-slate-800 via-slate-950 to-black/50 p-4 border-2 border-slate-600/60 rounded-xl grid grid-cols-2 w-fit text-center ml-30 mt-10">
        
                {/* Posted user Infromation */}
                    <div className="justify-items-center p-5 w-full bg-slate-950/50 rounded-xl border-2 border-slate-500/60">
                        <UserAvatar size={110} username={postData?.user_name} />
                        <div className="mt-2 font-bold font-mono text-[21px]">
                            <p>@{postData?.user_internalName}</p>
                            <p className="text-center">{postData?.user_name}</p>
                        </div>
                    </div>

                {/* Post desc, post links, post tags, post created */}
                    <div className="bg-slate-950/50 rounded-xl ml-1.5 p-2 font-bold font-mono text-[20px] border-2 border-slate-500/60">
                        <p className="mt-3">{postData?.post_desc}</p>
                        <div className="w-full text-wrap flex flex-col">
                            <label className="text-[16px] mt-8 bg-linear-to-br from-slate-900/50 via-slate-800/40 to-black/60 p-2 mx-auto border-2 border-slate-600/50 rounded-xl">Post related links:</label>
                            <button onClick={handleLinkViewToggle} className={`transition-opacity ml-45 ${postData?.post_links?.length > 2 ? "visible" : "hidden" }`}>{ postLinkLimit !== postData?.post_links?.length ? <ToggleLeft /> : <ToggleRight /> }</button>
                            {postData?.post_links?.map((link, i) => (
                                <>
                                { i < postLinkLimit && 
                                <>
                                    <a
                                        href={link}
                                        key={i}
                                        className="text-blue-700 font-mono font-bold underline cursor-pointer p-1"
                                        target="_blank"
                                    >
                                    { link }
                                    </a>
                                </> 
                                    }
                                </>
                            ))}
                            <p className="text-[16px] font-medium text-pink-800">{ postLinkLimit !== postData?.post_links?.length && postData?.post_links?.length > 2 ?  `${postData?.post_links?.length - postLinkLimit}+ links` : "" }</p>
                        </div>
                        <div className="w-full flex flex-col">
                            <label className="text-[16px] mt-8 bg-linear-to-br from-slate-900/50 via-slate-800/40 to-black/60 p-2 mx-auto border-2 border-slate-600/50 rounded-xl">Post related tags:</label>
                            <button onClick={handleTagsViewToggle} className={`transition-opacity ml-45 ${postData?.post_tags?.length > 2 ? "visible cursor-pointer" : "hidden cursor-not-allowed" }`}>{ postTagsLimit !== postData?.post_tags?.length ? <ToggleLeft /> : <ToggleRight /> }</button>
                            { postData?.post_tags?.map((tag, i) => (
                                <>
                                { i < postTagsLimit && (
                                    <>
                                    <div key={i}>
                                      <p className={`${tagBadgesBg[i % postData?.post_tags?.length]} py-1 rounded text-lg`}>#{ tag }</p>
                                    </div>
                                    </>
                                )}
                                </>
                            ))}
                            <p className="text-[16px] font-medium text-pink-800">{ postTagsLimit !== postData?.post_tags?.length && postData?.post_tags?.length > 2 ?  `${postData?.post_tags?.length - postTagsLimit}+ tags` : "" }</p>
                        </div>
                    </div>
            </div>
        </div>
    )}
    </>
  )
}

export default OnePostPage