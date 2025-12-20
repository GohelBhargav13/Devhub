import toast from "react-hot-toast"
import { userLogoutApi } from "../apis/auth.api"
import { Button } from "../component/layout/Button"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
    const navigate = useNavigate()
    const logoutHandler = async() => {
        const responseData = await userLogoutApi()
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