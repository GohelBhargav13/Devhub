import  { useState } from 'react'
import { MessageSquare, Lock, Eye, EyeClosed, User } from "lucide-react"
import { userRegisterApi } from "../apis/auth.api.js"
import toast from 'react-hot-toast'

const RegisterPage = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [username,setUsername] = useState("")
    const [showPassword,setShowPassword] = useState(false)

    // User Register API handler
    const handlesubmit = async(e) => {
       e.preventDefault()
       try {
            const responseData = await userRegisterApi({ user_email:email, user_name:username,user_password:password })
            if(responseData?.StatusCode >= 400){
                toast.error(responseData?.error)
                return
            }
            if(responseData?.StatusCode >= 200){
                toast.success(responseData?.message)
                return
            }
       } catch (error) {
            console.log("Error while register a user in RegisterPage",error?.message)
       }finally{
            setEmail("")
            setPassword("")
            setUsername("")
       }
    }

  return (
   <div className="flex flex-col gap-2 justify-center items-center text-3xl min-h-screen">
      {/* Form Container */}
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-linear-to-br from-cyan-400 to-blue-500 rounded-lg"></div>
            <h1 className="text-3xl font-bold text-cyan-400">DevHub</h1>
          </div>
          <p className="text-slate-500">
            {false ? 'Welcome back!' : 'Join our community'}
          </p>
        </div>
      </div>
      <form
        onSubmit={handlesubmit}
        className="w-full max-w-md bg-linear-to-br from-slate-800 via-slate-700 to-slate-800 p-8 rounded-2xl shadow-lg"
      ><div>
         <label className="block mb-4 text-lg font-bold font-mono">username</label>
         <div className="relative">
            <User className="absolute top-4 left-2 text-slate-500" size={20}/>
          <input
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="you@email.com"
            className="w-full max-w-md pl-10 pb-3 border-2 border-white bg-slate-700 left-15 p-4 rounded-lg shadow-lg text-sm focus:outline-none focus:border-cyan-400"
          />
        </div>
        </div>

        <div>
         <label className="block mb-4 text-lg font-bold font-mono mt-2">Email</label>
         <div className="relative">
            <MessageSquare className="absolute top-4 left-2 text-slate-500" size={20}/>
          <input
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full max-w-md pl-10 pb-3 border-2 border-white bg-slate-700 left-15 p-4 rounded-lg shadow-lg text-sm focus:outline-none focus:border-cyan-400"
          />
        </div>
        </div>

        <div className="mt-2">
            <div className="relative">
            <label className="block mb-4 text-lg font-bold font-mono text-slate-100">Password</label>
            <Lock className="absolute top-15 left-2 text-slate-500" size={20} />
            <input
                name="password"
                id="password"
                type={ showPassword ? "text" : "password" }
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=". . . . . . . . . ."
                className="w-full max-w-md pl-10 pb-3 border-2 border-white bg-slate-700 left-15 p-4 rounded-lg shadow-lg text-sm focus:outline-none focus:border-cyan-400"
            />
            <button type='button' className="absolute left-82 top-15 cursor-pointer hover:shadow-amber-50 text-slate-900" onClick={() => setShowPassword(!showPassword)}>
                { showPassword ? <EyeClosed size={20} /> : <Eye size={20} />  }
            </button>
            </div>
        </div>
        <div>
            <button type="submit"
            disabled={ !email || !password || !username }
            className={`text-[18px] font-mono font-bold text-white bg-cyan-500  ${ (!email || !password || !username ) ? "disabled:bg-slate-400 disabled:cursor-not-allowed" : "bg-linear-to-br from-cyan-700 via-cyan-400 to-cyan-700 hover:bg-cyan-600 cursor-pointer hover:shadow-2xl" } w-full max-w-md mt-6 p-3 rounded-lg shadow-lg transition-all`}
            >
                Register
            </button>
        </div>
        <p className="font-mono text-[16px] mt-4 text-center">Do You Have Account? <a href="/login" className="font-bold text-blue-700 underline">Login</a></p>
      </form>
    </div>
  )
}

export default RegisterPage