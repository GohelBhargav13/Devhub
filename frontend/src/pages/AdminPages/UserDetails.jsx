import React, { useEffect, useState } from 'react'
import SideBar from '../../component/layout/SideBar'
import { useAuthStore } from "../../store/auth.store.js"
import { Trash } from 'lucide-react'
import { allUsersDetails } from "../../apis/post.api.js"
import toast from 'react-hot-toast'
import { socket } from '../../server/server.js'

const UserDetails = () => {

    // functions from the useAuthStore
    const userInfo = useAuthStore((state) => state.userData)
    const deleteUser = useAuthStore((state) => state.deleteUser)
    const [userDetails,setUserDetails] = useState([])
    const [searchUser,setSearchUser] = useState("")
    
    // UseEffect with socket integration
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

        // socket-listeners
        socket.on("newUserJoined",({ new_user,message }) => {
          const new_obj = { user_name:new_user?.user_name,user_internal_name:new_user?.internal_username,user_email:new_user?.user_email,user_role:new_user?.user_role, created_at:new_user?.created_at }

          setUserDetails(prev => [...prev,new_obj])
          if(userInfo?.user_role === 'ADMIN' && message) toast.success(message)
        })

        socket.on("userError",({ message }) => {
          toast.error(message)
          return
        })

        // unmount the socket-listener
        return () => {
            socket.off("newUserJoined")
        }

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

    // User filter code
    const filtered_users = userDetails.filter((user) => user.user_name.toLowerCase().includes(searchUser.toLowerCase()))

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
          <div className='w-full mx-auto text-center'>
            <input 
            type='text'
            name='search_user'
            placeholder='Search Users...'
            className='bg-slate-950 text-white p-2 h-12 w-90 border-2 border-white rounded-lg outline-none hover:border-2 hover:border-b-2 hover:border-b-cyan-300 hover:border-r-2 hover:border-r-cyan-300 hover:duration-300'
            onChange={(e) => setSearchUser(e.target.value)}
            />
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
              { filtered_users.length > 0 ? (
                 <tbody className='w-full h-auto p-3 border-l-4 border-white border-r-4'>
                {/* Map through the users and display their data */}
                {filtered_users?.map((user,i) => (
                  <tr key={user.user_id} className='border-b-2 border-white'>
                    <td className='p-5 border-r-3 border-white'>{i + 1}</td>
                    <td className='p-2 border-r-3 border-white'>{user.user_name}</td>
                    <td className='p-2 border-r-3 border-white'>{user.user_email}</td>
                    <td className='p-2 border-r-3 border-white'>{user.user_internal_name}</td>
                    <td className='p-2 border-r-3 border-white'>{user.user_role}</td>
                    <td className='p-2 border-r-3 border-white'>{user.created_at.slice(0,10)}</td>
                    <td className={`p-2 flex justify-center bg-linear-to-br from-slate-900 via-slate-700 to-slate-950 border-2 border-white rounded-lg m-3 ${user.user_role === 'ADMIN' ? "" : "hover:border-b-4 hover:border-r-4 hover:border-white cursor-pointer"}`}>
                        <button className={`${user.user_role === 'ADMIN' ? "cursor-not-allowed" : "cursor-pointer"  }`} onClick={() => userDeleteHandler(user?.user_id)}
                        disabled={ user.user_role === 'ADMIN' } 
                        >
                            <Trash />
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              ) : (
                <div className='w-full h-full text-center font-bold text-[20px] font-mono'>
                  <p>No Users Found</p>
                </div>
              ) }
            </table>
          </div>
        </div>
    </div>
  )
}

export default UserDetails