export const userGreetMessage = async(username) => {
    try {

        const date = new Date()
        const hours_time = date.toLocaleTimeString().slice(0,1)
        const AM_PM_time = date.toLocaleTimeString().split(" ")[1]

        // console.log(AM_PM_time)
        // console.log(hours_time)


        if(hours_time >= '5' && AM_PM_time === 'pm'){
            return `Good Evening ${username}`
        }
        if(hours_time >= '12' && AM_PM_time === 'pm'){
            return `Good Afternoon ${username}`
        }
         if(hours_time >= '0' && AM_PM_time === 'am'){
            return `Good Morning ${username}`
        }

        
    } catch (error) {
        console.log("Error while change the greeting a user",error)
    }
}