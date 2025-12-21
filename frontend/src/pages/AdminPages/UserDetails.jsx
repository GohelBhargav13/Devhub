import React, { useEffect, useState } from 'react'
import SideBar from '../../component/layout/SideBar'
import { useAuthStore } from "../../store/auth.store.js"
import { Trash } from 'lucide-react'
import { allUsersDetails,deleteUserFunc } from "../../apis/post.api.js"
import toast from 'react-hot-toast'

const UserDetails = () => {
    const userInfo = useAuthStore((state) => state.userData)
    const deleteUser = useAuthStore((state) => state.deleteUser)
    const [userDetails,setUserDetails] = useState([])
    
    useEffect(() => {
        const detailsOfUsers = async() => {
           try {
             const responseData = await allUsersDetails()
             if(!responseData?.status){
                 toast.error(responseData?.error)
                 return
             }
 
             setUserDetails(responseData?.user_data)
             toast.success(responseData?.message)
           } catch (error) {
                console.log("Error from the UserDetails page",error)
           }
        }

        detailsOfUsers()

    },[])

    // User delete handler from the db
    const userDeleteHandler = async(user_id) => {
        try {
           const responseData = await deleteUser(user_id)
           if(!responseData?.status){
                toast.error(responseData?.error)
                return
           }

           setUserDetails(prev => prev.filter(u => u?.user_id !== user_id))
           toast.success(responseData?.message)
        } catch (error) {
            console.log("Error while deleting a user with the user_id in UserDetails",error)
        }
    }

  return (
    <div className='flex flex-row gap-10'>
        <div>
          <SideBar userData={userInfo} />
        </div>
        <div className='flex flex-col gap-5 py-10 w-full h-screen overflow-y-scroll'>
            <div className="text-3xl font-mono font-bold my-5 text-right mr-10">
            <p className="border-b-2 border-r-2 border-white rounded-4xl p-2 hover:border-b-4 hover:border-white px-5">
             <code>
                Devhub@:~$ Hello Sudo, {`${userInfo?.user_name.split(" ")[0].toUpperCase()}`}
             </code>
            </p>
            <p className='text-start mt-2 p-4'>
              <code className='bg-linear-to-br from-slate-900 via-slate-700 to-slate-950 p-2 rounded-lg border-r-4 border-l-2 border-white py-3 cursor-pointer hover:border-b-2 hover:border-b-cyan-300'>
                Platform Users
              </code>
            </p>
          </div>
          <div className='w-full h-screen p-5'>
            {/* Making a users table for data display */}
            <table className='w-full h-auto p-4 text-center'>
              <thead>
                <tr className='bg-linear-to-br from-slate-900 via-slate-700 to-slate-950 border-2 border-white rounded-lg'>
                  <th className='p-2'>Sr No</th>
                  <th className='p-2'>User Name</th>
                  <th className='p-2'>User Email</th>
                  <th className='p-2'>User InternalName</th>
                  <th className='p-2'>UserRole</th>
                  <th className='p-2'>Join On</th>
                  <th className='p-2'>Action</th>
                </tr>
              </thead>
              <tbody className='w-full h-auto p-3 border-l-4 border-white border-r-4'>
                {/* Map through the users and display their data */}
                {userDetails?.map((user,i) => (
                  <tr key={user.user_id} className='border-b-2 border-white'>
                    <td className='p-5 border-r-3 border-white'>{i + 1}</td>
                    <td className='p-2 border-r-3 border-white'>{user.user_name}</td>
                    <td className='p-2 border-r-3 border-white'>{user.user_email}</td>
                    <td className='p-2 border-r-3 border-white'>{user.user_internal_name}</td>
                    <td className='p-2 border-r-3 border-white'>{user.user_role}</td>
                    <td className='p-2 border-r-3 border-white'>{user.created_at.slice(0,10)}</td>
                    <td className='p-2 flex justify-center bg-linear-to-br from-slate-900 via-slate-700 to-slate-950 border-2 border-white rounded-lg m-3 hover:border-b-4 hover:border-r-4 hover:border-white cursor-pointer'>
                        <button className='cursor-pointer' onClick={() => userDeleteHandler(user?.user_id)}
                        disabled={ user?.user_id === userInfo?.user_id } 
                        >
                            <Trash />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
}

export default UserDetails