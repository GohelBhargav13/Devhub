import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom"

const DocsPage = () => {
    const navigate = useNavigate()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isPageLoaded, setIsPageLoaded] = useState(null)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const handleNavigation = (pagePath) => {
        setIsLoaded(false)
        setIsPageLoaded(pagePath)
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
          onClick={() => handleNavigation("/docs/info-docs")}
          className={`mr-4 text-blue-400 font-bold font-mono bg-slate-950/80 p-2 rounded-lg border-2 border-white hover:bg-slate-800/20 hover:drop-shadow-2xl hover:border-r-4 hover:border-r-slate-500 hover:border-b-4 hover:border-b-slate-500 hover:border-t-2 hover:border-t-slate-500 hover:border-l-2 hover:border-l-slate-500 transition-all duration-500 ease-out inline-block ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          Info Docs
        </Link>
        <Link 
          to="/docs/api-docs" 
          onClick={() => handleNavigation("/docs/api-docs")}
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
       { isPageLoaded ? <Outlet key={isPageLoaded} /> : (
          <div className='bg-slate-950 w-full h-fit flex flex-col items-center justify-center mt-7 rounded-lg border-2 border-white/20 shadow-lg shadow-black/50'>
            <h2 className='text-center text-slate-300 font-mono font-bold p-10 text-[20px]'>Welcome to the Documentation Page of DevHuB !</h2>
            <div className='text-slate-400 font-mono p-5 text-center flex flex-col gap-7'>
              <div className='flex gap-3 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-5 rounded-lg border-2 border-white/20 shadow-lg shadow-black/50'>
                  <div>
                    <img  src='https://static-blog.onlyoffice.com/wp-content/uploads/2022/07/Blog_10popular_documents.jpg' className='w-180 h-70 rounded-lg border-2 border-white/20 shadow-lg shadow-black/50 hover:drop-shadow-2xl hover:scale-x-105 duration-500 ease-in cursor-pointer hover:border-r-4 hover:border-gray-400' />
                  </div>
                  <div className='p-3'>
                      <p className='text-[16px] text-justify mt-5'>This is the documentation page of DevHuB where you explore the features and capabilities of our platform.</p>
                      <p className='text-[16px] text-justify mt-5'>Here you can find detailed information about how to use DevHuB, including guides and API documentation for developers.</p>
                      <p className='text-[16px] text-justify mt-5'>Here you can find the features and the capabilities of DevHuB and how to use the features of the platform and the step-by-step guide to get started.</p>
                  </div>
              </div>
              <p>Please select a docs from the navigation bar to get started.</p>
               <div className='flex gap-3 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-5 rounded-lg border-2 border-white/20 shadow-lg shadow-black/50'>
                  <div className='p-3'>
                    <p className='text-[16px] text-justify mt-5'>This is the API-Docs page of DevHuB where you explore the different api's of our platform.</p>
                    <p className='text-[16px] text-justify mt-5'>Here the all working api's are listed and how to use the api's and the step-by-step guide to get started.</p>
                    <p className='text-[16px] text-justify mt-5'>One more feature of this api-docs is that you can also test the api response and also try out the api's.</p>
                  </div>
                  <div>
                    <img  src='https://unified.cc/images/blog/understanding-api-response-time.png?v=1666261530443966697' className='w-180 h-70 rounded-lg border-2 border-white/20 shadow-lg shadow-black/50 hover:drop-shadow-2xl hover:scale-x-105 duration-500 ease-in cursor-pointer hover:border-l-4 hover:border-blue-700' />
                  </div>
              </div>
            </div>
          </div>
       ) }
      </div>
    </div>
  )
}

export default DocsPage