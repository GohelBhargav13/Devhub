import { Routes,Route } from "react-router-dom"
import LoginPage from "./pages/loginPage.jsx"
import { Toaster } from "react-hot-toast"
import HomePage from "./pages/HomePage.jsx"

function App() {
  return (
    <>
      <div className='min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white'>
        <Toaster position="bottom-left" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={ <LoginPage /> } />
        </Routes>
      </div>
    </>
  )
}

export default App
