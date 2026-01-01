import { User,BookOpen } from 'lucide-react'


// All API Routes Documentation
const allApiRoutes = [
    { 'method': 'GET', 'mpath': '/user/register', 'description': 'Register a new user account.' },
    {  'method': 'POST','mpath': '/user/login', 'description': 'Login to an existing user account.' },
    { 'method': 'GET','mpath': '/user/email-verify/:user_token', 'description': 'Verify user email.' },
    { 'method': 'GET', 'mpath': '/user/user-porfile', 'description': 'Get user profile.' },
    { 'method': 'POST', 'mpath': '/user/user-account', 'description': 'Delete user account.' },
    { 'method': 'GET','mpath': '/user/user-logout', 'description': 'Logout user.' },
]

// Post API Routes Documentation
const allPostApiRoutes = [
    {  'method': 'POST','mpath': '/post/create-post', 'description': 'Create a New Post.' },
    {  'method': 'GET','mpath': '/post/all-posts', 'description': 'Get All Posts.' },
    {  'method': 'GET','mpath': '/post/login-user-posts', 'description': 'Get Login User Posts.' },
    {  'method': 'DEL','mpath': '/post/delete-post/:postId', 'description': 'Delete a Post.' },
]

const ApiDocs = () => {
  return (
    <div className='bg-slate-950/20 opacity-70 via-slate-800 to-slate-900 backdrop-blur-3xl font-mono p-5 m-5 rounded-lg border-2 border-white'>
    <h2 className='text-center text-[25px] font-bold'>Platform API</h2>
        <div className='p-3 grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
                <div>
                    <h3 className='text-[17px] font-bold flex gap-2'><User />USERS-API</h3>
                    <ul className='m-4'>
                    { allApiRoutes.map((routes) => (
                         <div className='flex gap-1 mt-2' key={routes.mpath}>
                            { routes.method === 'GET' && (
                                    <>
                                    <p className='p-2 text-emerald-400 font-bold'>{ routes.method }</p>
                                    <p className='bg-green-400/20 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                    <p className='text-[17px] p-2 font-bold text-green-600/90'>- { routes.description }</p>
                                </>
                                ) }
                                { routes.method === 'POST' && (
                                    <>
                                    <p className='p-2 text-yellow-300 font-bold'>{ routes.method }</p>
                                    <p className='bg-yellow-400/20 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                    <p className='text-[17px] p-2 font-bold text-amber-500/90'>- { routes.description }</p>
                                </>
                                ) }
                                 { routes.method === 'DEL' && (
                                    <>
                                    <p className='p-2 text-red-300 font-bold'>{ routes.method }</p>
                                    <p className='bg-yellow-400/20 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                    <p className='text-[17px] p-2 font-bold text-amber-500/90'>- { routes.description }</p>
                                </>
                                ) }
                        </div>
                    ))}
                    </ul>
                </div>
                 <div>
                    <h3 className='text-[17px] font-bold flex gap-2'><BookOpen />USER-POST-API</h3>
                    <ul className='m-4'>
                    { allPostApiRoutes.map((routes) => (
                          <div className='flex gap-1 mt-2' key={routes.mpath}>
                            { routes.method === 'GET' && (
                                    <>
                                    <p className='p-2 text-emerald-400 font-bold'>{ routes.method }</p>
                                    <p className='bg-green-400/20 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                    <p className='text-[17px] p-2 font-bold text-green-600/90'>- { routes.description }</p>
                                </>
                                ) }
                                { routes.method === 'POST' && (
                                    <>
                                    <p className='p-2 text-yellow-300 font-bold'>{ routes.method }</p>
                                    <p className='bg-yellow-400/20 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                    <p className='text-[17px] p-2 font-bold text-amber-500/90'>- { routes.description }</p>
                                </>
                                ) }
                                 { routes.method === 'DEL' && (
                                    <>
                                    <p className='p-2 text-red-300 font-bold'>{ routes.method }</p>
                                    <p className='bg-red-400/70 backdrop-blur-2xl p-2 rounded-xl border-2 border-white'>{ routes.mpath }</p>
                                    <p className='text-[17px] p-2 font-bold text-red-400/90'>- { routes.description }</p>
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