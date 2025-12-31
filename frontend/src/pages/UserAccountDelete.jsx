import React, { useState } from 'react'
import {  CircleAlert  } from "lucide-react"
import { DeleteAccountUser } from "../apis/auth.api.js"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const UserAccountDelete = () => {
    const [isChecked,setIsChecked] = useState(false)
    const [isUserPassword,setIsUserPassword] = useState("")
    const [isProcessing,setIsProccessing] = useState(false)
    const navigate = useNavigate()

    // checkbox handler
    const handleCheckInput = () => {
        setIsChecked(!isChecked)
    }  

    // form submit handler
    const handleSubmit = async(e) => {
       e.preventDefault()
       try {
          setIsProccessing(true)
            const responseData = await DeleteAccountUser(isUserPassword)
    
            if(!responseData?.status){
                toast.error(responseData?.error)
                navigate("/delete-user-account")
                return
            }
            toast.success(responseData?.message)
            localStorage.clear()
            navigate("/login")
            setIsUserPassword("")
       } catch (error) {
            setIsProccessing(false)
            console.log("Error while delete a user account from the main page",error)
       }finally {
            setIsProccessing(false)
       }
    }

  return (
    <>
        <div className='w-full min-h-screen items-center justify-center flex p-4'>
            <form onSubmit={handleSubmit} className='bg-red-950/30 backdrop-blur-sm p-6 rounded-lg border-2 border-red-900 w-full max-w-md'>
                <div className='flex gap-4 mb-3'>
                <CircleAlert className='mt-3 text-red-700' size={30} />
                    <div>
                        <h2 className='text-2xl font-bold text-red-400'>Delete Account</h2>
                        <p className='font-mono font-bold text-[17px] text-red-300'>This action cannot be undone</p>
                    </div>
                </div>
                <div className='bg-slate-950 p-4 rounded-lg border-2 border-red-600 flex flex-col gap-3'>
                    <div className='flex flex-col gap-2 mt-1'>
                        <p className='text-red-300 font-mono font-bold'>You will lost:</p>
                        <ul className='text-slate-100 font-mono list-disc list-inside'>
                            <li>This Will delete your All posts.</li>
                            <li>This Will delete your All Data.</li>
                            <li>This Will delete your Account.</li>
                        </ul>
                    </div>
                </div>
                <div className='flex gap-2 mt-2 ml-1'>
                        <input type='checkbox' className='w-3 h-3 mt-1.75 accent-red-500' onClick={handleCheckInput} />
                        <p className='font-mono font-bold text-[15px]'>I understand the all policies and terms.</p>
                    </div>
                        { isChecked && (
                        <>
                        <div className='bg-slate-950 p-4 mt-3 rounded-lg border-2 border-red-500'>
                        <p className='text-red-300 font-bold font-mono text-[16px]'>please enter your password for proceed:</p> 
                        <div className='flex gap-2 w-full justify-center mt-3'>
                            <input type='password' className='text-white p-1 border-2 w-full border-white rounded-lg' onChange={(e) => setIsUserPassword(e.target.value)} value={isUserPassword} placeholder='Enter your password' />

                            <button type='submit' 
                            disabled={ isProcessing || !isUserPassword }
                            className={`border-2 border-slate-400 p-2 rounded-xl ${ isProcessing ? "bg-gray-700 cursor-not-allowed" : "bg-slate-900 cursor-pointer" } font-mono`}> { isProcessing ? 'Processing...' : 'confirm' } </button>
                        </div>
                        </div>
                        </>
                        ) }
            </form>
        </div>
    </>
  )
}

export default UserAccountDelete