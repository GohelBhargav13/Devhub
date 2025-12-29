import { useState } from "react"
import { X,MenuSquare,Home,Contact,LogOut, Cross,LayoutDashboard,User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import UserAvatar from "./UserAvatar.jsx"
import { useAuthStore } from "../../store/auth.store.js"
import toast from "react-hot-toast"

const platform_urls_users = [
  { 'url_name':'Home', 'path':'/', 'url_icon':<Home /> },
  { 'url_name':'Profile', 'path':'/get-profile','url_icon':<Contact /> },
  { 'url_name':'Post', 'path':'/new-post','url_icon':<Cross /> },
]

const platform_urls_admin = [
     { 'url_name':'Dashboard', 'path':'/admin/dashboard','url_icon':<LayoutDashboard /> },
     { 'url_name':'Users', 'path':'/admin/user-data','url_icon':<User /> },
]

const SideBar = ({ userData }) => {
    const [isOpen, setIsOpen] = useState(false)
    const naviagte = useNavigate()
    const userLogout = useAuthStore((state) => state.userLogout)

    // User Logout handler
    const handleLogout = async() => {
      const responseData = await userLogout()

      if(responseData?.StatusCode >= 400){
        toast.error(responseData?.error)
        return
      }
      if(responseData?.StatusCode >= 200){
        toast.success(responseData?.message)
        return
      }
    }

  return (
    <div className={`${isOpen ? "w-60" : "w-25"} bg-linear-to-br from-slate-950/65 opacity-80 via-slate-900 to-slate-950 h-auto min-h-screen border-r-4 border-r-white p-3 rounded-xl shadow-lg`}>
      <div className="text-white font-bold font-mono">
          <div className="flex flex-row justify-end">
            {isOpen ? ( <X className="hover:p-1 cursor-pointer hover:duration-200 hover:border-b-2
                hover:border-b-cyan-200 hover:border-r-2
                hover:border-r-cyan-200 rounded-lg" size={30} onClick={() => setIsOpen(!isOpen)}/>) : ( <MenuSquare className="hover:p-1 cursor-pointer hover:duration-200 hover:border-b-2
                hover:border-b-cyan-200 hover:border-r-2
                hover:border-r-cyan-200 rounded-lg" size={30} onClick={() => setIsOpen(!isOpen)} />) }
          </div>
          <div className={`flex flex-row gap-2 w-full ${isOpen ? "p-8 justify-center" : "p-4"}`}>
                { isOpen ? ( 
                  <div className="flex gap-0.5 border-r-2 border-r-white border-b-2 border-b-white rounded-2xl p-2 hover:border-r-6 hover:border-r-cyan-200 hover:border-b-6 hover:border-b-cyan-200 hover:duration-200">
                    <p className="text-3xl font-mono font-bold text-slate-300">D</p>
                    <p className="text-3xl font-mono font-bold text-slate-500">E</p>
                    <p className="text-3xl font-mono font-bold text-slate-700">V</p>
                    <p className="text-3xl font-mono font-bold text-cyan-600">H</p>
                    <p className="text-3xl font-mono font-bold text-cyan-700">U</p>
                    <p className="text-3xl font-mono font-bold text-slate-700">B</p>
                  </div>
                   ) : ( <div className="mt-4 bg-slate-950 text-white p-3 rounded-xl border-r-2 border-r-white border-b-4 border-b-white text-[20px]">DH</div> ) }
          </div>
          <div className={`flex flex-col text-[17px] gap-8 ${isOpen ? "p-8" : "p-2"}`}>
                   {platform_urls_users.map((url) => (
                    ( isOpen ? ( <button key={url.url_name} className=" bg-cyan-400 rounded-lg p-3 hover:bg-cyan-500 hover:text-white hover:cursor-pointer hover:p-3 duration-300 hover:rounded-xl hover:border-r-4 hover:border-r-white hover:border-b-4 hover:border-b-white" onClick={() => naviagte(url.path)}>{url.url_name}</button>) : ( <button key={url.url_name} className="bg-cyan-400 rounded-lg p-3 hover:bg-cyan-500 hover:text-white hover:cursor-pointer hover:p-3 duration-300 hover:rounded-xl hover:border-r-4 hover:border-r-white hover:border-b-4 hover:border-b-white justify-items-center" onClick={() => naviagte(url.path)}>
                      { url.url_icon }
                    </button>))
                   ))}
                    {userData?.user_role === 'ADMIN' && platform_urls_admin.map((url) => (
                    ( isOpen ? ( <button key={url.url_name} className=" bg-cyan-400 rounded-lg p-3 hover:bg-cyan-500 hover:text-white hover:cursor-pointer hover:p-3 duration-300 hover:rounded-xl hover:border-r-4 hover:border-r-white hover:border-b-4 hover:border-b-white" onClick={() => naviagte(url.path)}>{url.url_name}</button>) : ( <button key={url.url_name} className="bg-cyan-400 rounded-lg p-3 hover:bg-cyan-500 hover:text-white hover:cursor-pointer hover:p-3 duration-300 hover:rounded-xl hover:border-r-4 hover:border-r-white hover:border-b-4 hover:border-b-white justify-items-center" onClick={() => naviagte(url.path)}>
                      { url.url_icon }
                    </button>))
                   ))}
          </div>
           <div className={`flex flex-col h-full w-full ${isOpen ? "justify-end" : "mt-16"}`}>
              <div className="bg-slate-950 text-white border-2 border-white rounded-lg p-3">
              {isOpen ? ( <div className="flex flex-row gap-4 text-sm">
                    <UserAvatar username={userData?.user_name} />
                    <div className="flex flex-col">
                      <p className="mt-1">{ userData?.user_name }</p>
                      <p className="text-slate-600">{'@'}{ userData?.user_internalname }</p>
                    </div>
                  </div>) : (
                    <div className="justify-items-center">
                      <UserAvatar username={userData?.user_name} />
                    </div>
                  )}
              </div>
              <div>
                { isOpen ? (
                     <button className="bg-cyan-400 rounded-lg p-3 hover:bg-cyan-500 hover:text-white hover:cursor-pointer hover:p-3 duration-300 hover:rounded-xl hover:border-r-4 hover:border-r-white hover:border-b-4 hover:border-b-white mt-3 items-center" onClick={handleLogout}>Logout</button>
                ) : (
                  <button className="bg-cyan-400 rounded-lg p-3 hover:bg-cyan-500 hover:text-white hover:cursor-pointer hover:p-3 duration-300 hover:rounded-xl hover:border-r-4 hover:border-r-white hover:border-b-4 hover:border-b-white mt-4" onClick={handleLogout}>
                  <LogOut size={30} />
                  </button>
                ) }
              </div>
          </div>
      </div>
    </div>
  )
}

export default SideBar