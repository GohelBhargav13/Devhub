// Greet function based on the time
export const userGreetMessage = (username) => {
    try {
        const date = new Date();
        const hours = date.getHours(); // Get current hour in 24-hour format

        if (hours >= 5 && hours < 12) {
            return `A fresh start and Good Morning ${username}🌄`;
        } else if (hours >= 12 && hours < 17) {
            return `Good Afternoon ${username}🌆`;
        } else if (hours >= 17 && hours < 23) {
            return `Good Evening ${username}🌆`;
        } else {
            return `it's actually late night ${username}, get some rest!🌃`;
        }

    } catch (error) {
        console.log("Error while changing the greeting for a user", error);
    }
};

// post time calculation services
export const postDescCountTime = (post_desc) => {
    try {
        const post_desc_len = post_desc.length
        if(typeof post_desc !== "string" && post_desc_len === 0){
            return `post description is not a string please make it perfect and the length`
        }

        if(post_desc_len > 250){
            return `5+ min read`
        }else if(post_desc_len > 180){
            return `4 min read`
        }else if(post_desc_len > 110){
            return `3 min read`
        }else if(post_desc_len > 50){
            return  `2 min read`
        }else {
            return `1 min read`
        }
        
    } catch (error) {
        console.log("Error while calculating a desc time of the post",error)
        return
    }
}