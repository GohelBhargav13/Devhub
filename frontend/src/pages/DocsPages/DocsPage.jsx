import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom"

const DocsPage = () => {
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const handleNavigation = () => {
        setIsLoaded(false)
        setTimeout(() => setIsLoaded(true), 100)
    }

  return (
    <div>
      <button 
        className="p-2 m-3 text-blue-400 font-bold font-mono bg-slate-950/80 rounded-lg border-2 border-white hover:bg-slate-800/20 hover:drop-shadow-2xl hover:border-r-4 hover:border-r-slate-500 hover:border-b-4 hover:border-b-slate-500 hover:border-t-2 hover:border-t-slate-500 hover:border-l-2 hover:border-l-slate-500 cursor-pointer transition-all duration-300" 
        onClick={() => navigate("/")}
      >
        Home
      </button>

      <div className={`flex justify-center text-[24px] font-bold font-mono p-1.5 mt-5 gap-2 transition-all duration-500 ease-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <h1 className="text-slate-300 border-l-2 border-l-white p-1 rounded-lg bg-linear-to-br from-slate-950/70 opacity-100 via-slate-800 to-slate-900">DevHuB</h1>
        <h1 className="text-slate-300 border-r-2 border-r-white p-1 rounded-lg bg-linear-to-br from-slate-950/70 opacity-100 via-slate-800 to-slate-900">Documentation</h1>
      </div>

      <nav className="w-full text-end ml-auto h-fit p-2">
        <Link 
          to="/docs/info-docs" 
          onClick={handleNavigation}
          className={`mr-4 text-blue-400 font-bold font-mono bg-slate-950/80 p-2 rounded-lg border-2 border-white hover:bg-slate-800/20 hover:drop-shadow-2xl hover:border-r-4 hover:border-r-slate-500 hover:border-b-4 hover:border-b-slate-500 hover:border-t-2 hover:border-t-slate-500 hover:border-l-2 hover:border-l-slate-500 transition-all duration-500 ease-out inline-block ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          Info Docs
        </Link>
        <Link 
          to="/docs/api-docs" 
          onClick={handleNavigation}
          className={`mr-4 text-blue-400 font-bold font-mono bg-slate-950/80 p-2 rounded-lg border-2 border-white hover:bg-slate-800/20 hover:drop-shadow-2xl hover:border-r-4 hover:border-r-slate-500 hover:border-b-4 hover:border-b-slate-500 hover:border-t-2 hover:border-t-slate-500 hover:border-l-2 hover:border-l-slate-500 transition-all duration-500 ease-out inline-block ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          Developer Docs
        </Link>
      </nav>

      <div className={`transition-all duration-500 ease-out ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <Outlet />
      </div>
    </div>
  )
}

export default DocsPage