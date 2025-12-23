import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { UserEmailVerify } from "../apis/auth.api.js"
import toast from "react-hot-toast"

const EmailVerifiy = () => {
    const { emailToken } = useParams()
    const [isVerfiying,setIsVerifiying] = useState(false)

    // Email Verification controller for the email check
    useEffect(() => {
        const emailVerification = async() => {
          try {
             setIsVerifiying(true)
             const responseData = await UserEmailVerify(emailToken)
             if(!responseData?.status){
                  toast.error(responseData?.error)
                  return
             }
             toast.success(responseData?.message)
          } catch (error) {
            setIsVerifiying(false)
            toast.error(error?.message)
            console.log("Error while verifiying a email",error)
          }finally{
            setIsVerifiying(false)
          }
        }
        emailVerification()
    },[])

  return (
    <div className="w-full h-screen p-5 min-h-screen py-70">
       <div className="flex flex-col gap-2 items-center text-center">
            <div>
                { isVerfiying ? (
                    <img 
                    src="https://cdn.imgbin.com/4/5/13/email-icon-search-icon-9EphbzQK.jpg"
                    className="border-2 border-white rounded-xl border-r-4 border-r-cyan-300 border-b-2 border-b-cyan-300 shadow-2xl animate-bounce"
                    alt="Verifiying you're email"
                    width={100}
                    height={70}
                    />
                ) : (
                    <img  
                        src="https://img.icons8.com/ios_filled/1200/verified-account.jpg"
                        className="border-2 border-white rounded-xl border-r-4 border-r-cyan-300 border-b-2 border-b-cyan-300 shadow-2xl animate-bounce"
                        alt="Email verified"
                        width={100}
                        height={70}
                    />
                ) }
            </div>
            <div className="p-2 text-center">
                { isVerfiying ? (
                    <h3 className="font-mono font-bold text-[20px] animate-pulse bg-slate-700 p-3 rounded-xl border-r-cyan-200 border-b-cyan-200 border-r-2 border-b-4"> Verfiying Your Email... </h3>
                ) : (
                    <>
                        <h3 className="font-mono font-bold text-[20px] animate-pulse bg-slate-700 p-3 rounded-xl border-r-cyan-200 border-b-cyan-200 border-r-2 border-b-4"> Email Verified... </h3>
                        <button className="bg-linear-to-br mt-2 ml-16 from-cyan-700 via-cyan-400 to-cyan-700 hover:bg-cyan-600 cursor-pointer hover:shadow-2xl p-3 border-b-4 border-r-2 border-white animate-pulse rounded-lg"><a href="/login" className="outline-none decoration-none text-[18px] font-bold font-mono">Go To Login</a></button>
                    </>
                ) }
            </div>
       </div>
    </div>
  )
}

export default EmailVerifiy