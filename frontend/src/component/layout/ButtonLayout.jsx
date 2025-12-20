
export const ButtonLayout = ({children}) => {
  return (
   <div
    className='text-[18px] font-mono font-bold text-white bg-cyan-500 bg-linear-to-br from-cyan-700 via-cyan-400 to-cyan-700 hover:bg-cyan-600 cursor-pointer hover:shadow-2xl w-fit max-w-md p-3 rounded-lg shadow-lg transition-all text-center'
    >
   { children }
   </div>
  )
}
