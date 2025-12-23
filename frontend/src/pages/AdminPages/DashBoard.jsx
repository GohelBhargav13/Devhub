import { useEffect, useState } from 'react'
import SideBar from '../../component/layout/SideBar'
import { useAuthStore } from "../../store/auth.store.js"
import { countAll } from "../../apis/post.api.js"

const DashBoard = () => {
    const userInfo = useAuthStore(state => state.userData)
    const [total_users, setTotal_users] = useState("")
    const [total_posts, setTotal_posts] = useState("")
    const [total_active, setTotal_active] = useState("")
    
    useEffect(() => {
       const fetchAllCounts = async() => {
          const t_c =  await countAll()

          if(t_c?.status){
            console.log(t_c)
            const [ total_users_c, total_posts_c, total_active_users ] = t_c?.data
            setTotal_users(total_users_c?.data?.total_users)
            setTotal_posts(total_posts_c?.data?.total_posts)
            setTotal_active(total_active_users?.data?.total_active_users)
          }
       }
       fetchAllCounts()
    },[])
  return (
   <div className='flex flex-row gap-5'>
        <div><SideBar userData={userInfo} /></div>
        <div className='flex flex-col gap-5 py-10 w-full h-screen'>
            <div className="text-3xl font-mono font-bold my-11 text-right mr-10">
            <p className="border-b-2 border-r-2 border-white rounded-4xl p-2 hover:border-b-4 hover:border-white px-5">
             <code>
                Devhub@:~$ Hello Sudo, {`${userInfo?.user_name.split(" ")[0].toUpperCase()}`}
             </code>
            </p>
          </div>
          <div className='grid grid-cols-2 w-full h-50 gap-5 p-4'>
                <div className='bg-linear-to-br from-slate-800 via-slate-700 to-slate-900 p-3 rounded-xl border-r-2 border-b-4 border-white border-r-cyan-300 text-center'>
                    <div className='w-full h-auto p-8 bg-slate-800 rounded-3xl border-t-2 border-l-4 border-white border-l-cyan-300'>
                        <p className='font-bold font-mono text-[22px]'>Total Users:</p>
                        <p className='text-[30px]'>{total_users}+</p>
                    </div>
                </div>
                 <div className='bg-linear-to-br from-slate-800 via-slate-700 to-slate-900 p-3 rounded-xl border-r-2 border-b-4 border-white border-r-cyan-300 text-center'>
                       <div className='w-full h-auto p-8 bg-slate-800 rounded-3xl border-t-2 border-l-4 border-white border-l-cyan-300'>
                        <p className='font-bold font-mono text-[22px]'>Total Posts:</p>
                        <p className='text-[30px]'>{total_posts}+</p>
                    </div>
                </div>
                 <div className='bg-linear-to-br from-slate-800 via-slate-700 to-slate-900 p-3 rounded-xl border-r-2 border-b-4 border-white border-r-cyan-300 text-center'>
                       <div className='w-full h-auto p-8 bg-slate-800 rounded-3xl border-t-2 border-l-4 border-white border-l-cyan-300'>
                        <p className='font-bold font-mono text-[22px]'>Current Active:</p>
                        <p className='text-[30px]'>{total_active}+</p>
                    </div>
                </div>
                 <div className='bg-linear-to-br from-slate-800 via-slate-700 to-slate-900 p-3 rounded-xl border-r-2 border-b-4 border-white border-r-cyan-300 text-center'>
                       <div className='w-full h-auto p-8 bg-slate-800 rounded-3xl border-t-2 border-l-4 border-white border-l-cyan-300'>
                        <p className='font-bold font-mono text-[22px]'>Total Posts:</p>
                        <p className='text-[30px]'>500+</p>
                    </div>
                </div>
          </div>
        </div>
   </div>
  )
}

export default DashBoard