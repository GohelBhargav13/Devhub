import React from 'react'

const FourOFour = () => {
  return (
    <div className='w-full h-screen bg-slate-800 flex flex-col justify-items-center'>
            <div className='flex flex-col justify-center items-center py-40'>
                <img src='https://cdn-icons-png.flaticon.com/512/755/755014.png' className='w-65 h-65 bg-slate-950/50 p-5 rounded-xl border-r-6 border-r-white border-b-6 border-b-white border-t-2 border-t-white border-l-2 border-l-white shadow-2xl animate-pulse' />
                <div className='w-70 h-auto mt-3 rounded-xl rounded-r-full mask-b-to-red-950 border-2 border-slate-950/80 bg-black/30 p-2 font-mono font-bold text-center'>
                        404 Page Not Found
                </div>
            </div>
            <div className='w-full text-center'>
                <a href='/' className='text-blue-600 font-mono font-bold text-[21px] bg-slate-950/60 p-1 rounded-lg hover:underline'>GO TO HOME</a>
            </div>
    </div>
  )
}

export default FourOFour