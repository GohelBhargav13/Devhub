import { useEffect,useState } from 'react'
import SideBar from '../component/layout/SideBar'
import { useAuthStore } from "../store/auth.store.js"
import { fetchUserSavedPosts, unsavePostByUser } from "../apis/post.api.js"
import toast from 'react-hot-toast'
import { tagBadgesBg } from '../services/tagBadge.js'
import { BookmarkMinus, Calendar, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import UserAvatar from '../component/layout/UserAvatar'
import { postDescCountTime,userGreetMessage } from '../apis/greet.api.js'

const UserSavedPosts = () => {
    const [allSavedPosts,setAllSavedPosts] = useState([])
    const [isShowDesc,setIsShowDesc] = useState(null)
    const [searchWord, setSearchWord] = useState("");
    const [isShowLink,setIsShowLink] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const userData = useAuthStore(state => state.userData)

    useEffect(() => {
        const fetchSavedPosts = async() => {
            try {
                setIsLoading(true)
                const responseData = await fetchUserSavedPosts()
                if(!responseData?.status){
                    toast.error(responseData?.error || "Error in fetch posts")
                    return
                }
                setAllSavedPosts(responseData?.data)
                toast.success(responseData?.message || "user posts fecthed...")
            } catch (error) {
                setIsLoading(false)
                console.log("Error while fetching a posts",error)
            }finally {
                setIsLoading(false)
            }
        }

        fetchSavedPosts()
    },[])

     // post search functionality
  const searchPost = allSavedPosts.filter(
    (post) =>
      post.post_desc.toLowerCase().includes(searchWord.toLowerCase()) ||
      post.post_tags.filter((tag) =>
        tag.toLowerCase().includes(searchWord.toLowerCase())
      ).length > 0
  );
    
  // Handle a show more/less for post description
  const handleShowDesc = (post_id) => {
    setIsShowDesc(prev => prev === post_id ? null : post_id)
  }

  // Handle a show more/less for post links
  const handleShowLink = (post_id) => {
    setIsShowLink(prev => prev === post_id ? null : post_id)
  }

    // Handle a unsave post by user
  const handleUnsavePost = async(post_id) => {
    try {
      const responseData = await unsavePostByUser(post_id)
      if(!responseData?.status){
        toast.error(responseData?.error)
        return
      }
      toast.success(responseData?.message)
      setAllSavedPosts(prev => prev.filter(post => post?.post_id !== post_id))
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.response?.data?.message)
    }
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-row gap-4 w-full">
        <div>
          <SideBar userData={userData} />
        </div>
         <div className="flex flex-col gap-3 w-full h-screen min-h-screen">
          <div className="text-3xl font-mono font-bold my-11 text-right mr-10">
            <p className="border-b-2 border-r-2 border-white rounded-4xl p-2 hover:border-b-4 hover:border-white px-5">
               { userGreetMessage(userData?.user_name.split(" ")[0].toUpperCase()) }
            </p>
          </div>

          <div className="mx-auto">
            <input
              type="text"
              placeholder="Search..."
              className="bg-slate-950 text-white p-2 h-12 w-90 border-2 border-white rounded-lg outline-none hover:border-2 hover:border-b-2 hover:border-b-cyan-300 hover:border-r-2 hover:border-r-cyan-300 hover:duration-300"
              onChange={(e) => setSearchWord(e.target.value)}
            />
          </div>

          {isLoading ? (
            <>
              <div className="flex justify-center gap-2 items-center h-96">
                <Loader2 className="animate-spin duration-300" />
                <p className="text-white text-[20px] font-mono font-bold">
                  Loading posts...
                </p>
              </div>
            </>
          ) : allSavedPosts.length === 0 || searchPost.length === 0 ? (
            <div className="flex justify-center items-center h-96">
              <p className="text-white text-xl">No posts available</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 p-4 mt-10 text-white">
              {allSavedPosts.map((post,i) =>  (
                <div className="w-fit h-fit bg-linear-to-br from-slate-800 via-slate-850 to-slate-900 rounded-lg border-2 border-slate-500 hover:scale-105 hover:duration-300 hover:border-r-4 hover:border-b-4 hover:border-r-slate-200 hover:border-b-slate-200" key={post?.post_id}>
                  <div className="flex flex-col gap-3 p-2">
                    <div className="flex gap-5 border-b-2 border-slate-400 p-1 rounded-xl">
                      <div>
                        <UserAvatar username={post?.user_name} size={50} />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-mono font-bold text-[15px]">
                          {post?.user_name}
                        </p>
                        <p className="font-mono font-bold text-[17px]">
                          {"@"}
                          {post?.user_internal_name ?? "None"}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 text-end w-full">
                        <div className="flex justify-end gap-2 font-mono font-bold text-[15px] ml-auto">
                          <Calendar />
                          <p>{post?.created_at ? new Date(post?.created_at).toLocaleDateString() : "N/A"}</p>
                        </div>
                       <div className="font-mono text-[13px] w-full justify-end flex text-slate-300 font-bold mr-1 gap-2">
                              <button className="cursor-pointer" onClick={() => handleUnsavePost(post?.post_id)}><BookmarkMinus /></button>
                           <p>{postDescCountTime(post?.post_desc)}</p>
                       </div>
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
          )}
        </div>
      </div>
    </div>
  )
}

export default UserSavedPosts