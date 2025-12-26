import { useEffect, useRef, useState } from "react";
import SideBar from "../component/layout/SideBar.jsx";
import UserAvatar from "../component/layout/UserAvatar.jsx";
import { fetchAllPosts } from "../apis/post.api.js";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth.store.js";
import { tagBadgesBg } from "../services/tagBadge.js"

const HomePage = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord,setSearchWord] = useState("")
  const userData = useAuthStore((state) => state.userData); // Get from Zustand instead of props

  useEffect(() => {
    const fetchPosts = async() => {
      setIsLoading(true);
      try {
        const responseData = await fetchAllPosts();

        if(!responseData?.status){
          toast.error(responseData?.error || "Failed to fetch posts");
          return;
        }

        toast.success(responseData?.message);
        setAllPosts(responseData?.all_posts || []);
      } catch (error) {
        console.log("Error fetching posts:", error);
        toast.error("Error fetching posts");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts(); 
  }, []);

  const searchPost = allPosts.filter((post) => post.post_desc.toLowerCase().includes(searchWord.toLowerCase()) || post.post_tags.filter((tag) => tag.toLowerCase().includes(searchWord.toLowerCase())).length > 0);

  if(!userData){
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-row gap-4 w-full">
        <div className="">
          <SideBar userData={userData} />
        </div>
        <div className="flex flex-col gap-3 w-full h-screen overflow-y-scroll">
          <div className="text-3xl font-mono font-bold my-11 text-right mr-10">
            <p className="border-b-2 border-r-2 border-white rounded-4xl p-2 hover:border-b-4 hover:border-white px-5">
              Good Morning, {userData?.user_name?.split(" ")[0]?.toUpperCase()}👋
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
            <div className="flex justify-center items-center h-96">
              <p className="text-white text-xl">Loading posts...</p>
            </div>
          ) : allPosts.length === 0 ? (
            <div className="flex justify-center items-center h-96">
              <p className="text-white text-xl">No posts available</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 p-4 mt-10 text-white">
              {searchPost.map((post) => (
                <div 
                  key={post?.post_at} 
                  className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 h-auto rounded-2xl hover:scale-105 hover:duration-300 hover:border-r-2 hover:border-slate-500 hover:border-b-2 w-fit"
                >
                  <div className="flex gap-5 p-4 w-full">
                    <div className="p-1 rounded-lg">
                      <UserAvatar username={post?.user_name} size={50} />
                    </div>
                    <div className="flex flex-col w-full">
                      <p className="font-mono font-bold text-xl">{post?.user_name}</p>
                      <p className="font-mono font-bold text-xl text-slate-300">
                        {'@'}{post?.internal_username ?? "None"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-linear-to-br from-slate-700 to-slate-950 h-fit p-4 w-fit rounded-xl rounded-t-3xl py-8 border-t-4 border-t-white">
                    <p className="mb-7 font-mono text-[16px]">{post?.post_desc}</p>
                    {post?.post_link && (
                      <>
                        <label>Following Links:</label>
                        <a href={post?.post_link} className="text-blue-700 font-mono font-bold underline cursor-pointer p-1" target="_blank">
                          {post?.post_link}
                        </a>
                      </>
                    )}
                    <div className="w-full flex flex-row gap-1">
                    {post.post_tags && post?.post_tags?.map((tag,i) => (
                      <div key={i} className="mt-3">
                        <p className={`${tagBadgesBg[i % post?.post_tags?.length]} py-1 rounded text-lg`}>#{ tag }</p>
                      </div>
                    ))}
                    </div>
                    <p className="text-end mt-4">{"~ "}{post?.post_at ? new Date(post?.post_at).toLocaleDateString() : "N/A"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;