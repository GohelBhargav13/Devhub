export const userGreetMessage = (username) => {
    try {
        const date = new Date();
        const hours = date.getHours(); // Get current hour in 24-hour format

        if (hours >= 5 && hours < 12) {
            return `Good Morning ${username}🌄`;
        } else if (hours >= 12 && hours < 17) {
            return `Good Afternoon ${username}🌆`;
        } else if (hours >= 17 && hours < 21) {
            return `Good Evening ${username}🌆`;
        } else {
            return `Late Night ${username}🌚`;
        }

    } catch (error) {
        console.log("Error while changing the greeting for a user", error);
    }
};