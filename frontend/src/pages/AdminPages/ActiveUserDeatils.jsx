import { Loader2 } from "lucide-react"

const ActiveUserDeatils = ({ activeUsers }) => {

    if(activeUsers?.length === 0){
        return (
            <div className="flex flex-row justify-center w-full gap-2 mt-7 h-auto">
                <Loader2 className="animate-spin duration-300" />
                <p className="font-bold font-mono text-[20px]">Loading Users...</p>
            </div>
        )
    }

  return (
      <div className='w-full h-auto p-5'>
            {/* Making a users table for data display */}
            <table className='w-full h-auto p-4 text-center'>
              <thead>
                <tr className='bg-linear-to-br from-slate-900 via-slate-700 to-slate-950 border-2 border-white rounded-lg'>
                  <th className='p-2'>Sr No</th>
                  <th className='p-2'>User Name</th>
                  <th className='p-2'>User InternalName</th>
                </tr>
              </thead>
              { activeUsers.length > 0 ? (
                 <tbody className='w-full h-auto p-3 border-l-4 border-white border-r-4'>
                {/* Map through the users and display their data */}
                {activeUsers?.map((user,i) => (
                  <tr key={i} className='border-b-2 border-white'>
                    <td className='p-5 border-r-3 border-white'>{i + 1}</td>
                    <td className='p-2 border-r-3 border-white'>{user.user_name}</td>
                    <td className='p-2 border-r-3 border-white'>{user.user_internalName}</td>
                  </tr>
                ))}
              </tbody>
              ) : (
                <div className='w-full h-full text-center font-bold text-[20px] font-mono'>
                  <p>No Users Found</p>
                </div>
              ) }
            </table>
          </div>
  )
}

export default ActiveUserDeatils