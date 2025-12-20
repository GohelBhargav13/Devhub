import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/auth.store.js"

export const ProtectRoute = ({children}) => {
    const userData = useAuthStore((state) => state.userData)
    const isLogin = localStorage.getItem("isLogin")
    const isInitialized = useAuthStore((state) => state.isInitialized)
        
    if(!isInitialized){
        return (
            <div>Loading...</div>
        )
    }

   return (userData && isLogin) ? children : <Navigate to="/login" />
}
