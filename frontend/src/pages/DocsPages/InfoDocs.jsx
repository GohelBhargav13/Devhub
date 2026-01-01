import React from 'react'

const InfoDocs = () => {
  return (
    <div className='bg-slate-950/20 opacity-70 via-slate-800 to-slate-900 backdrop-blur-3xl font-mono p-5 m-5 rounded-lg border-2 border-white'>
        <h1 className='text-center text-[25px] font-bold'>Platform Info</h1>
         <div className="flex gap-0.5 rounded-2xl p-2 hover:border-r-6 hover:border-r-cyan-200 hover:border-b-6 hover:border-b-cyan-200 hover:duration-200 mt-3">
                    <p className='text-3xl font-mono font-bold mr-3 text-cyan-500'>Welcome</p>
                    <p className="text-3xl font-mono font-bold text-slate-300">D</p>
                    <p className="text-3xl font-mono font-bold text-slate-500">E</p>
                    <p className="text-3xl font-mono font-bold text-slate-700">V</p>
                    <p className="text-3xl font-mono font-bold text-cyan-600">H</p>
                    <p className="text-3xl font-mono font-bold text-cyan-700">U</p>
                    <p className="text-3xl font-mono font-bold text-slate-700">B,</p>
                  </div>
        <div>
            <p className='mt-5 text-[16px] ml-3'>DevHuB is a A developers community where dev can share a new and latest updates,version to the other devs.</p>
            <p className='mt-3 text-[16px] ml-3'>Our platform provides a seamless experience for developers to connect and stay updated with the latest trends in the tech world.</p>
        </div>
        <div className='flex flex-col gap-2 ml-4'>
            <h2 className='text-cyan-400 mt-2 p-3 text-[23px] font-bold'>Why DevHub ?</h2>
            <ul className='list-disc ml-10'>
                <li className='text-[16px]'>Stay Updated: Get the latest updates on new releases, versions, and trends in the developer community.</li>
                <li className='text-[16px]'>Connect with Peers: Network with fellow developers, share knowledge.</li>
                <li className='text-[16px]'>Resource Hub: Access a wealth of resources and documentation to enhance your skills.</li>
                <li className='text-[16px]'>User-Friendly Interface: Enjoy a seamless and intuitive platform designed for developers.</li>
            </ul>

            <h2 className='text-cyan-400 mt-2 p-3 text-[23px] font-bold'>Key Features</h2> 
            <ul className='list-disc ml-10'>
                <li className='text-[16px]'>Tech news sharing</li>
                <li className='text-[16px]'>Community interaction</li>
                <li className='text-[16px]'>Real-time updates</li>
                <li className='text-[16px]'>User profiles</li>
                <li className='text-[16px]'>Latest Post Updates</li>
                <li className='text-[16px]'>Post Creation</li>
                <li className='text-[16px]'>Latest Post Search</li>
            </ul>  
        </div>
    </div>
  )
}

export default InfoDocs