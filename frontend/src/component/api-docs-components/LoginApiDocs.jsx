import { Minus, RectangleHorizontal, X } from "lucide-react";
import { useRef, useState } from "react";
import { handlePostRequest } from "../../apis/auth.api.js";
import { toast } from "react-hot-toast"

const LoginApiDocs = ({ apiMethod,apiPath }) => {
    const curlResponseRef = useRef(null)
    const copyBtnRef = useRef(null)
    const [currentApiResponse,setCurrentApiResponse] = useState(null)
    const [userEmail,setUserEmail] = useState("")
    const [userPassword,setUserPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)

     // handle a POST /create-user api request
    const handleTryOut = async(method,path,e) => {
        try {
            setIsLoading(true)
            e.preventDefault()
          const response = await handlePostRequest(path,{ user_email:userEmail,user_password:userPassword })

          setCurrentApiResponse(JSON.stringify(response))
          setUserEmail("")
          setUserPassword("")
          setUsername("")
        } catch (error) {
            setIsLoading(false)
            console.error(`Error while requesting a users request on ${ path }`,error)
            return
        }finally{
            setIsLoading(false)
        }
    } 

    // handle a reset feature of the form
    const handleResetFunc = (e) => {
        e.preventDefault()
        setUserEmail("")
        setUserPassword("")
        setUsername("")
        setIsLoading(false)
        setCurrentApiResponse(null)
    }

    // handle COPY feature
    const handleCopyFunc = () => {
        navigator.clipboard.writeText(curlResponseRef.current.innerText)
        copyBtnRef.current.innerText = "COPIED!"
        toast.success("Text copied!")
        setTimeout(() => copyBtnRef.current.innerText = 'COPY' ,1000)
    }

     // handle reset current api respone
    const handleResetResponseFunc = () => {
      setCurrentApiResponse(null)
    }

  return (
   <div>
      <div className="bg-slate-900 p-3 rounded-xl border-2 border-white mt-3 grid grid-cols-1 gap-2 w-full">
        <div className="bg-black rounded-xl flex flex-col border-2 border-x-amber-900">
          <div className="flex gap-2 justify-end p-2">
            <p className="bg-red-600 rounded-full w-4 h-4 text-center text-white">
              <Minus size={15} />
            </p>
            <p className="bg-yellow-400 rounded-full w-4 h-4 text-center">
              <RectangleHorizontal size={16} className="p-0.5 text-black" />
            </p>
            <p className="bg-green-500 rounded-full w-4 h-4 text-center">
              <X size={17} className="p-0.5 text-black" />
            </p>
          </div>
            <div className="flex ml-auto mr-2 mt-2` ">
                <button ref={copyBtnRef} className="bg-linear-to-br from-slate-900 via-slate-700 to-black p-2 mb-3 rounded-lg border-2 border-white hover:bg-slate-700 cursor-pointer" onClick={handleCopyFunc}>COPY</button>
            </div>
          <pre ref={curlResponseRef} className="font-medium p-2 text-[15px] mb-2 text-green-400/90">{`curl -X ${apiMethod} 'http://localhost:8000${apiPath} 
          -d '{"user_email":"${userEmail}","user_password":"${userPassword}"} 
          -H "Content-Type: application/json'`}</pre>
        </div>
            {/* Handle a required parameters for the user-register */}
            <div className="bg-slate-950 flex justify-center p-4 max-w-full">
                <form onSubmit={(e) => handleTryOut(apiMethod,apiPath,e)}>
                 <h3 className="text-center text-[20px] font-bold">User Sing-up</h3>
                    <div className="p-2 bg-linear-to-br from-slate-950 via-slate-800 to-black rounded-2xl border-t-2 border-t-white border-r-4 border-slate-400/70 border-b-4 border-b-slate-400/70 border-l-2 border-l-white w-full">
                         <div className="flex flex-col p-2">
                            <label className="text-[17px] font-bold ml-1">Email</label>
                            <input type="email" className="p-2 border-2 border-slate-700/90 rounded-xl w-sm" placeholder="your@example.com" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required/>
                        </div>
                         <div className="flex flex-col p-2">
                            <label className="text-[17px] font-bold ml-1">Password</label>
                            <input type="password" className="p-2 border-2 border-slate-700/90 rounded-xl w-sm" placeholder="..........." value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required/>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className=" bg-slate-800 p-2 mb-3 rounded-lg border-2 border-white hover:bg-slate-700 cursor-pointer ml-auto"
                                type="button"
                                onClick={handleResetFunc}
                            >
                            Reset
                          </button>
                            <button
                                className=" bg-slate-800 p-2 mb-3 rounded-lg border-2 border-white hover:bg-slate-700 cursor-pointer mr-1"
                                type="submit"
                            >
                            Try Out
                          </button>
                    </div>
                    </div>
               </form>
            </div>
        <div className="bg-black rounded-xl flex flex-col border-2 border-x-amber-900">
          <div className="flex gap-2 justify-end p-2">
            <p className="bg-red-600 rounded-full w-4 h-4 text-center text-white">
              <Minus size={15} />
            </p>
            <p className="bg-yellow-400 rounded-full w-4 h-4 text-center">
              <RectangleHorizontal size={16} className="p-0.5 text-black" />
            </p>
            <p className="bg-green-500 rounded-full w-4 h-4 text-center">
              <X size={17} className="p-0.5 text-black" />
            </p>
          </div>
          <button className=" bg-slate-800 p-2 mb-3 rounded-lg border-2 border-white hover:bg-slate-700 cursor-pointer ml-auto mr-2" onClick={handleResetResponseFunc}>Reset</button>
          <div className="font-medium p-2 text-[15px] mb-2 text-green-400/90">
            {!isLoading && currentApiResponse === null && (
              <div className="flex gap-2.5">
                <p className="text-yellow-300/70 font-bold text-[17px]">
                  Please click on{" "}
                </p>
                <p className="text-yellow-700/90 underline font-bold text-[19px]">
                  TRY OUT
                </p>
                <p className="text-yellow-300/70 font-bold text-[17px]">
                  to get a response
                </p>
              </div>
            )}
            {isLoading ? (
              <p>Loading Response...</p>
            ) : (
              <>
                <pre>{currentApiResponse !== null && currentApiResponse}</pre>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginApiDocs