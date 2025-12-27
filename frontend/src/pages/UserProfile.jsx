import React, { useState } from 'react'
import SideBar from '../component/layout/SideBar'
import { useAuthStore } from "../store/auth.store.js"
import UserAvatar from '../component/layout/UserAvatar.jsx'
import UserPost from '../component/layout/UserPost.jsx'

const UserProfile = () => {
  const userInfo = useAuthStore((state) => state.userData)

  return (
    <div className='flex flex-row gap-5'>
      <div>
        <SideBar userData={userInfo} />
      </div>
      <div className='flex flex-col gap-5 w-full h-full py-20'>
          <div className='mx-auto flex flex-col bg-linear-to-br from-slate-950/70 opacity-100 via-slate-900 to-slate-900 w-120 h-60 rounded-lg border-r-4 border-white border-b-4'>
            <div className='mx-auto flex flex-row gap-5 py-3'>
                <div className='mx-auto mt-2'>
                  <UserAvatar username={userInfo?.user_name} size={80} />
                </div>
                <div className='text-lg font-mono font-bold mt-5'>
                    <p>{userInfo?.user_name}</p>
                      <p className='text-slate-600'>{"@"}{userInfo?.user_internalname ?? "None"}</p>
                </div>
              </div>
               <div className='w-115 h-50 m-2 bg-linear-to-br border-l-2 border-t-2 rounded-2xl border-white from-slate-700 to-slate-950'>
                <p className='text-lg text-center mt-4 mx-auto font-mono font-bold text-cyan-400 p-3'>{userInfo?.user_email ?? "None"}</p>
              </div>
          </div>
            <UserPost />
      </div>
    </div>
  )
}

export default UserProfile