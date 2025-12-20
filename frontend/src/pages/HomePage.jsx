import toast from "react-hot-toast"
import { ButtonLayout as Button } from "../component/layout/ButtonLayout"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../store/auth.store.js"

const HomePage = () => {
    const navigate = useNavigate()
    const logoutFunc = useAuthStore((state) => state.userLogout)

    const logoutHandler = async() => {
        const responseData = await logoutFunc()
        if(responseData?.StatusCode >= 400){
            toast.error(responseData?.error)
            return
        }
        if(responseData?.StatusCode >= 200){
            toast.success(responseData?.message)
            navigate("/login")
            return
        }
    }
  return (
    <div >
    <Button> <button onClick={logoutHandler} className="cursor-pointer">logout</button> </Button>
    </div>
  )
}

export default HomePage