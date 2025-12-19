/**
 * 
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next 
 * @returns 
 */
export const checkUserRole = (roles = []) => {
    return (req,res,next) => {
        try {
            const user_role = req.user.user_role
            if(!roles.includes(user_role)){
                return res.status(401).json({ 'StatusCode':401, 'error':"You're not authorize person for this route" })
            }

            next()
        } catch (error) {
            console.log("Error while check the user role", error)
        }
    }
}