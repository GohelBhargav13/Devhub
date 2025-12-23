import { Routes,Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage.jsx"
import { Toaster } from "react-hot-toast"
import HomePage from "./pages/HomePage.jsx"
import RegisterPage from "./pages/RegisterPage.jsx"
import { useAuthStore } from "./store/auth.store.js"
import { useEffect } from "react"
import { ProtectRoute } from "./services/ProtectRoute.jsx"
import UserProfile from "./pages/UserProfile.jsx"
import NewPost from "./pages/NewPost.jsx"
import DashBoard from "./pages/AdminPages/DashBoard.jsx"
import AdminProtectRoute from "./services/AdminProtectRoute.jsx"
import UserDetails from "./pages/AdminPages/UserDetails.jsx"
import EmailVerifiy from "./pages/EmailVerifiy.jsx"


function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)
  const userData = useAuthStore((state) => state.userData)
  useEffect(() => {
    initializeAuth()
  },[])

  return (
    <>
      <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white'>
        <Toaster position="bottom-left" reverseOrder={false} containerStyle={{
          animation:"ease-in-out",
          accentColor:"AccentColor"
        }} 
        toastOptions={
          {
            style:{
              backgroundColor: "darkblue",
              color:"white",
              padding:'16px',
              border: '1px solid cyan'
            },
            iconTheme:{
              primary:'cyan',
              secondary:'gray'
            },
          }
        } />
        <Routes>
          <Route path="/" element={ <ProtectRoute> <HomePage /> </ProtectRoute>} />
          <Route path="/login" element={ <LoginPage /> } />
          <Route path="/register" element={ <RegisterPage /> } />
          <Route path="/email-verify/:emailToken" element={ <EmailVerifiy /> } />
          <Route path="/get-profile" element={ <ProtectRoute> <UserProfile /> </ProtectRoute> } />
          <Route path="/new-post" element={ <ProtectRoute> <NewPost /> </ProtectRoute> } />
          <Route path="/admin/dashboard" element={ <ProtectRoute> <AdminProtectRoute> <DashBoard /> </AdminProtectRoute> </ProtectRoute> } />
          <Route path="/admin/user-data" element={ <ProtectRoute> <AdminProtectRoute> <UserDetails /> </AdminProtectRoute> </ProtectRoute> } />
        </Routes>
      </div>
    </>
  )
}

export default App
