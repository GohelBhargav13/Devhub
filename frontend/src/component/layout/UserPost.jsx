import { useEffect, useState } from "react";
import { loginUserPosts } from "../../apis/post.api.js"
import toast from "react-hot-toast";
import UserAvatar from "./UserAvatar.jsx";

const UserPost = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading,setIsLoading] = useState(false)

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

  if(isLoading){
    return (
        <div className="text-center my-auto">Loading...</div>
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
        {allPosts.length > 0 &&
          allPosts.map((post) => (
            <div
              key={post?.post_at}
              className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 h-80 rounded-2xl hover:scale-105 hover:duration-300 hover:border-r-2 hover:border-slate-500 hover:border-b-2"
            >
              <div className="flex gap-5 p-4 w-full">
                <div className="p-1 rounded-lg">
                  <UserAvatar username={post?.user_name} size={50} />
                </div>
                <div className="flex flex-col w-full">
                  <p className="font-mono font-bold text-xl">
                    {post?.user_name}
                  </p>
                  <p className="font-mono font-bold text-xl text-slate-300">
                    {"@"}
                    {post?.internal_username ?? "None"}
                  </p>
                </div>
              </div>
              <div className="bg-linear-to-br from-slate-700 to-slate-950 h-57 p-4 w-full rounded-xl rounded-t-3xl py-8 border-t-4 border-t-white">
                <p className="mb-7 font-mono text-[16px]">{post?.post_desc}</p>
                {post?.post_link && (
                  <>
                    <label>Following Links:</label>
                    <a
                      href={post?.post_link}
                      className="text-blue-700 font-mono font-bold underline cursor-pointer p-1"
                      target="_blank"
                    >
                      {post?.post_link}
                    </a>
                  </>
                )}
                <p className="text-end mt-4">
                  {"~ "}
                  {post?.post_at
                    ? new Date(post?.post_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default UserPost;
