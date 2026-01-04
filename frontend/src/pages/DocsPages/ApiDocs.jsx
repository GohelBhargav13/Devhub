import { User,BookOpen,Minus,RectangleHorizontal,X } from 'lucide-react'
import { useState } from 'react'
import { fetchDocsApis } from '../../apis/post.api.js'


// All API Routes Documentation
const allApiRoutes = [
    { 'method': 'POST', 'mpath': '/user/register', 'description': 'Register a new user account.' },
    {  'method': 'POST','mpath': '/user/login', 'description': 'Login to an existing user account.' },
    { 'method': 'GET','mpath': '/user/email-verify/:user_token', 'description': 'Verify user email.' },
    { 'method': 'GET', 'mpath': '/user/user-porfile', 'description': 'Get user profile.' },
    { 'method': 'POST', 'mpath': '/user/user-account', 'description': 'Delete user account.' },
    { 'method': 'GET','mpath': '/user/user-logout-api-docs', 'description': 'Logout user.' },
]

// Post API Routes Documentation
const allPostApiRoutes = [
    {  'method': 'POST','mpath': '/post/create-post', 'description': 'Create a New Post.' },
    {  'method': 'GET','mpath': '/post/all-posts-api-docs', 'description': 'Get All Posts.' },
    {  'method': 'GET','mpath': '/post/login-user-posts', 'description': 'Get Login User Posts.' },
    {  'method': 'DEL','mpath': '/post/delete-post/:postId', 'description': 'Delete a Post.' },
]

const ApiDocs = () => {
    const [currentApiRoute, setCurrentApiRoute] = useState("")
    const [currentApiResponse,setCurrentApiResponse] = useState(null)
    const [isLoading,setIsLoading] = useState(false)

    // API try out feature controller
    const handleTryOut = async(method,path) => {
       try {
         setIsLoading(true)
         if(method === 'POST'){
             setCurrentApiRoute(prev => prev === path ? "" : path)
             return
         }
          if(method === 'DEL'){
             setCurrentApiRoute(prev => prev === path ? "" : path)
             return
         }
         if(method === 'GET'){
            setCurrentApiRoute(prev => prev === path ? "" : path)
            if(currentApiRoute === path) return
            const res = await fetchDocsApis(path)
            console.log("API Docs Try Out Response",res)
            setCurrentApiResponse(res?.data || JSON.stringify(res) || res?.error || "No Response Data" )
         }
       } catch (error) {
            setIsLoading(false)
            console.log("Error while trying out the api docs",error)
       }finally {
            setIsLoading(false)
       }
    }
  return (
    <div className='bg-slate-950/20 opacity-70 via-slate-800 to-slate-900 backdrop-blur-3xl font-mono p-5 m-5 rounded-lg border-2 border-white'>
    <h2 className='text-center text-[25px] font-bold'>Platform API</h2>
        <div className='p-3 grid grid-cols-1 md:grid-cols-1 gap-5 mt-5'>
                <div>
                    <h3 className='text-[27px] font-bold flex gap-2 ml-5'><User size={38} />USERS-API</h3>
                    <ul className='m-4'>
                    { allApiRoutes.map((routes) => (
                         <div className='grid grid-cols-1 mt-2' key={routes.mpath}>
                            { routes.method === 'GET' && (
                                    <>
                                     <div className='bg-slate-950 flex flex-col gap-2 p-4 rounded-xl border-2 border-white'>
                                      <button type='submit' onClick={() => handleTryOut(routes.method,routes.mpath)} className='flex justify-end w-fit bg-slate-800 p-2 mb-3 rounded-lg border-2 border-white hover:bg-slate-700 cursor-pointer justify-items-end'>Try Out</button>
                                    <div className='flex gap-2'>
                                    <p className='p-2 text-emerald-400 font-bold'>{ routes.method }</p>
                                    <p className='bg-green-400/20 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                    <p className='text-[17px] p-2 font-bold text-green-600/90'>- { routes.description }</p>
                                    </div>
                                    { currentApiRoute === routes.mpath && (
                                        <div>
                                           <div className='bg-slate-900 p-3 rounded-xl border-2 border-white mt-3 grid grid-cols-1 gap-2 w-full'>
                                                <div className='bg-black rounded-xl flex flex-col border-2 border-x-amber-900'>
                                                    <div className='flex gap-2 justify-end p-2'>
                                                        <p className='bg-red-600 rounded-full w-4 h-4 text-center text-white'><Minus size={15} /></p>
                                                        <p className='bg-yellow-400 rounded-full w-4 h-4 text-center'><RectangleHorizontal size={16} className='p-0.5 text-black' /></p>
                                                        <p className='bg-green-500 rounded-full w-4 h-4 text-center'><X size={17} className='p-0.5 text-black' /></p>
                                                    </div>
                                                    <p className='font-medium p-2 text-[15px] mb-2 text-green-400/90'>{ `curl -X ${routes.method} 'http://localhost:8000${routes.mpath}'` }</p>
                                                </div>
                                               <div className='bg-black rounded-xl flex flex-col border-2 border-x-amber-900'>
                                                    <div className='flex gap-2 justify-end p-2'>
                                                        <p className='bg-red-600 rounded-full w-4 h-4 text-center text-white'><Minus size={15} /></p>
                                                        <p className='bg-yellow-400 rounded-full w-4 h-4 text-center'><RectangleHorizontal size={16} className='p-0.5 text-black' /></p>
                                                        <p className='bg-green-500 rounded-full w-4 h-4 text-center'><X size={17} className='p-0.5 text-black' /></p>
                                                    </div>
                                                    <div className='font-medium p-2 text-[15px] mb-2 text-green-400/90'> 
                                                        { isLoading ? (
                                                            <p>Loading Response...</p>
                                                        ) : ( <pre>
                                                             { currentApiResponse }
                                                        </pre> ) }
                                                    </div>
                                                </div>
                                           </div>
                                        </div>
                                    )}
                                    </div>
                                </>
                                ) }
                                { routes.method === 'POST' && (
                                    <>
                                    <div className='bg-slate-950 flex flex-col gap-2 p-4 rounded-xl border-2 border-white'>
                                    <button type='submit' onClick={() => handleTryOut(routes.method,routes.mpath)} className='flex justify-end w-fit bg-slate-800 p-2 mb-3 rounded-lg border-2 border-white hover:bg-slate-700 cursor-pointer'>Try Out</button>
                                    <div className='flex gap-2'>
                                        <p className='p-2 text-yellow-300 font-bold'>{ routes.method }</p>
                                        <p className='bg-yellow-400/20 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                        <p className='text-[17px] p-2 font-bold text-amber-500/90'>- { routes.description }</p>
                                    </div>
                                    { currentApiRoute === routes.mpath && (
                                        <div>
                                            <p className='text-red-500/90 font-bold text-center mt-2'>for POST method it is not implemented...</p>
                                        </div>
                                    )}
                                    </div>
                                </>
                                ) }
                                 { routes.method === 'DEL' && (
                                    <>
                                     <div className='bg-slate-950 flex flex-col gap-2 p-4 rounded-xl border-2 border-white'>
                                     <button type='submit' onClick={() => handleTryOut(routes.method,routes.mpath)} className='flex justify-end w-fit bg-slate-800 p-2 mb-3 rounded-lg border-2 border-white hover:bg-slate-700 cursor-pointer'>Try Out</button>
                                     <div className='flex gap-2'>
                                    <p className='p-2 text-red-300 font-bold'>{ routes.method }</p>
                                    <p className='bg-yellow-400/20 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                    <p className='text-[17px] p-2 font-bold text-amber-500/90'>- { routes.description }</p>
                                    </div>
                                     { currentApiRoute === routes.mpath && (
                                        <div>
                                            <p className='text-red-500/90 font-bold text-center mt-2'>for DELETE method it is not implemented...</p>
                                        </div>
                                    )}
                                    </div>
                                </>
                                ) }
                        </div>
                    ))}
                    </ul>
                </div>
                 <div>
                    <h3 className='text-[27px] font-bold flex gap-2 ml-5'><BookOpen size={38} />USER-POST-API</h3>
                    <ul className='m-4'>
                    { allPostApiRoutes.map((routes) => (
                          <div className='grid grid-cols-1 mt-2' key={routes.mpath}>
                            { routes.method === 'GET' && (
                                    <>
                                    <div className='bg-slate-950 flex flex-col gap-2 p-4 rounded-xl border-2 border-white'>
                                    <button type='submit' onClick={() => handleTryOut(routes.method,routes.mpath)} className='flex justify-end w-fit bg-slate-800 p-2 mb-3 rounded-lg border-2 border-white hover:bg-slate-700 cursor-pointer justify-items-end'>Try Out</button>
                                    <div className='flex gap-2'>
                                    <p className='p-2 text-emerald-400 font-bold'>{ routes.method }</p>
                                    <p className='bg-green-400/20 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                    <p className='text-[17px] p-2 font-bold text-green-600/90'>- { routes.description }</p>
                                    </div>
                                    { currentApiRoute === routes.mpath && (
                                        <div>
                                           <div className='bg-slate-900 p-3 rounded-xl border-2 border-white mt-3 grid grid-cols-1 gap-2'>
                                                <div className='bg-black rounded-xl w-full flex flex-col border-2 border-x-amber-900'>
                                                    <div className='flex gap-2 justify-end p-2'>
                                                        <p className='bg-red-600 rounded-full w-4 h-4 text-center text-white'><Minus size={15} /></p>
                                                        <p className='bg-yellow-400 rounded-full w-4 h-4 text-center'><RectangleHorizontal size={16} className='p-0.5 text-black' /></p>
                                                        <p className='bg-green-500 rounded-full w-4 h-4 text-center'><X size={17} className='p-0.5 text-black' /></p>
                                                    </div>
                                                    <p className='font-medium p-2 text-[18px] mb-2 text-green-400/90'>{ `curl -X ${routes.method} 'http://localhost:8000${routes.mpath}'` }</p>
                                                </div>
                                               <div className='bg-black rounded-xl w-auto text-nowrap flex flex-col border-2 border-x-amber-900'>
                                                    <div className='flex gap-2 justify-end p-2'>
                                                        <p className='bg-red-600 rounded-full w-4 h-4 text-center text-white'><Minus size={15} /></p>
                                                        <p className='bg-yellow-400 rounded-full w-4 h-4 text-center'><RectangleHorizontal size={16} className='p-0.5 text-black' /></p>
                                                        <p className='bg-green-500 rounded-full w-4 h-4 text-center'><X size={17} className='p-0.5 text-black' /></p>
                                                    </div>
                                                    <div className='font-medium p-2 text-[15px] mb-2 text-green-400/90 '>
                                                        { isLoading ? (
                                                            <p>Loading Response...</p>
                                                        ) : ( 
                                                        <pre className='text-wrap'> { JSON.stringify(currentApiResponse,null,2) } </pre>
                                                        )}
                                                    </div>
                                                </div>
                                           </div>
                                        </div>
                                    )}
                                    </div>
                                </>
                                ) }
                                { routes.method === 'POST' && (
                                    <>
                                     <div className='bg-slate-950 flex flex-col gap-2 p-4 rounded-xl border-2 border-white'>
                                      <button type='submit' onClick={() => handleTryOut(routes.method,routes.mpath)} className='flex justify-end w-fit bg-slate-800 p-2 mb-3 rounded-lg border-2 border-white hover:bg-slate-700 cursor-pointer justify-items-end'>Try Out</button>
                                    <div className='flex gap-2'>
                                    <p className='p-2 text-yellow-300 font-bold'>{ routes.method }</p>
                                    <p className='bg-yellow-400/20 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                    <p className='text-[17px] p-2 font-bold text-amber-500/90'>- { routes.description }</p>
                                    </div>
                                    { currentApiRoute === routes.mpath && (
                                        <div>
                                            <p className='text-red-500/90 font-bold text-center mt-2'>for POST method it is not implemented...</p>
                                        </div>
                                    )}
                                    </div>
                                </>
                                ) }
                                 { routes.method === 'DEL' && (
                                    <>
                                     <div className='bg-slate-950 flex flex-col gap-2 p-4 rounded-xl border-2 border-white'>
                                      <button type='submit' onClick={() => handleTryOut(routes.method,routes.mpath)} className='flex justify-end w-fit bg-slate-800 p-2 mb-3 rounded-lg border-2 border-white hover:bg-slate-700 cursor-pointer justify-items-end'>Try Out</button>
                                    <div className='flex gap-2'>
                                    <p className='p-2 text-red-300 font-bold'>{ routes.method }</p>
                                    <p className='bg-red-400/70 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                    <p className='text-[17px] p-2 font-bold text-red-400/90'>- { routes.description }</p>
                                    </div>
                                    { currentApiRoute === routes.mpath && (
                                        <div>
                                            <p className='text-red-500/90 font-bold text-center mt-2'>for DELETE method it is not implemented...</p>
                                        </div>
                                    )}
                                    </div>
                                </>
                                ) }
                        </div>
                    ))}
                    </ul>
                </div>
        </div>
    </div>
  )
}

export default ApiDocs