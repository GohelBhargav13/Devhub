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
import ActiveUserDeatils from "./pages/AdminPages/ActiveUserDeatils.jsx"
import UserAccountDelete from "./pages/UserAccountDelete.jsx"
import DocsPage from "./pages/DocsPages/DocsPage.jsx"
import InfoDocs from "./pages/DocsPages/InfoDocs.jsx"
import ApiDocs from "./pages/DocsPages/ApiDocs.jsx"
import ForgotPass from "./pages/ForgotPass.jsx"
import FourOFour from "./pages/FourOFour.jsx"
import UserSavedPosts from "./pages/UserSavedPosts.jsx"


function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth)
  const userData = useAuthStore((state) => state.userData)
  useEffect(() => {
    initializeAuth()
  },[])

  return (
    <>
      <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-y-scroll'>
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
          <Route path="/forgot-password" element={ <ForgotPass /> } />
          <Route path="/get-profile" element={ <ProtectRoute> <UserProfile /> </ProtectRoute> } />
          <Route path="/new-post" element={ <ProtectRoute> <NewPost /> </ProtectRoute> } />
          <Route path="/delete-user-account" element={ <ProtectRoute> <UserAccountDelete /> </ProtectRoute> } />
          <Route path="/user-saved-posts" element={ <ProtectRoute> <UserSavedPosts /> </ProtectRoute> } />
          <Route path="/admin/dashboard" element={ <ProtectRoute> <AdminProtectRoute> <DashBoard /> </AdminProtectRoute> </ProtectRoute> } />
          <Route path="/admin/active-users" element={ <ProtectRoute> <AdminProtectRoute> <ActiveUserDeatils /> </AdminProtectRoute> </ProtectRoute> } />
          <Route path="/admin/user-data" element={ <ProtectRoute> <AdminProtectRoute> <UserDetails /> </AdminProtectRoute> </ProtectRoute> } />
          <Route path="/docs" element={ <DocsPage /> }>
              <Route path="info-docs" element={ <InfoDocs /> } />
              <Route path="api-docs" element={ <ApiDocs /> } />
          </Route>
          <Route path="*" element={ <FourOFour />} />
        </Routes>
      </div>
    </>
  )
}

export default App
