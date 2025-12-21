import { Navigate } from "react-router-dom"
import { useAuthStore } from "../store/auth.store.js"
import toast from "react-hot-toast"

const AdminProtectRoute = ({ children }) => {
    const userData = useAuthStore(state => state.userData)
    const isInitialized = useAuthStore(state => state.isInitialized)
    const isLoading = useAuthStore(state => state.isLoading)

    if(isLoading){
        return (
            <div>Loading...</div>
        )
    }

    if(isInitialized && !isLoading){
        if (userData?.user_role !== 'ADMIN')  toast.error("You're not able to access this route only Admin can access this route")
        return userData?.user_role === 'ADMIN' ? children : <Navigate to='/' />
    }
}

export default AdminProtectRoute