import { userTable } from "../models/index.js"
import {db} from "../db_config/db_config_postgres.js"
import { eq } from "drizzle-orm"
import { createHmac } from "node:crypto"


// user is already existing function
export const isUserExisting = async(user_email) => {
    try {
       const [existing_user] = await db.select().from(userTable).where(eq(user_email,userTable.user_email))

       if(existing_user){
            return { 'status': true, existing_user }
       }
       return { 'status': false }

    } catch (error) {
        console.log("Error while validating a user email")
    }
}

// Create new internal name for user
export const createInternalName = async() => {
    try {

        const first_random_name = [
        "Golden", "Silver", "Cool", "Epic", "Crazy", "Wild", "Silent",
        "Fierce", "Brave", "Swift", "Mystic", "Tech", "Cyber", "Digital",
        "Quantum", "Ninja", "Turbo", "Super", "Mega", "Ultra", "Cosmic",
        "Electric", "Neon", "Shadow", "Blazing", "Thunder", "Phoenix",
        "Dragon", "Stealth", "Rapid", "Savage", "Legendary", "Elite"
        ];


        const second_random_name = [
        "Girl", "Boy", "Coder", "Dev", "Hacker", "Geek", "Ninja", "Wizard",
        "Tiger", "Panda", "Wolf", "Eagle", "Falcon", "Dragon", "Phoenix",
        "Shark", "Lion", "Bear", "Fox", "Hawk", "Viper", "Panther",
        "Warrior", "Knight", "King", "Queen", "Master", "Legend", "Hero",
        "Guru", "Pro", "Boss", "Chief", "Pilot", "Rider"
        ]

        const index = Math.floor(Math.random() * first_random_name.length)
        const internal_name = `${first_random_name[index]}${second_random_name[index]}${Math.floor((Math.random(1,100) * 100))}`

        return internal_name
        
    } catch (error) {
        console.log("Internal Error while generating a internal name")
    }
}

// Create new user function
export const createNewUser = async(...userDetails) => {
    const [user_name,user_email,user_password,salt] = userDetails
    try {

        const internal_name = await createInternalName()
        const [new_user] = await db.insert(userTable).values({
            user_name,
            user_email,
            user_password,
            salt,
            internal_username:internal_name
        }).returning({
            user_id: userTable.user_id
        })

        return { 'new_user_id':new_user.user_id } 
        
    } catch (error) {
        console.log("Error while user new register")
    }

}

// user password match function
export const isPasswordMatch = async(user_password,user_email) => {
    try {

        const [existing_user] = await db.select({
            user_id:userTable.user_id,
            users_password:userTable.user_password,
            user_salt:userTable.salt,
            is_active:userTable.is_active
        }).from(userTable).where(eq(userTable.user_email,user_email))

        const login_user_password = createHmac("sha256",existing_user.user_salt).update(user_password).digest("hex")

        if(login_user_password !== existing_user.users_password){
            return { 'Status': false, 'Statuscode': 400 }
        }

        await db.update(userTable).set({ is_active:true }).where(eq(userTable.user_id,existing_user.user_id))

        return { 'Status':true, 'StatusCode': 200 }

    } catch (error) {
        console.log("error while matching a password from the user")        
    }
}

// change is_active status function
export const changeUserStatusLogin = async(user_id) => {
    try {
        if(!user_id){
            return
        }
         await db.update(userTable).set({ is_active:true }).where(eq(userTable.user_id,user_id))
    } catch (error) {
        console.log("Error while updating a users is_active status",error)
    }
} 

// change is_active status function for logout
export const changeUserStatusLogout = async(user_id) => {
    try {
        if(!user_id){
            return
        }
         await db.update(userTable).set({ is_active:false }).where(eq(userTable.user_id,user_id))
    } catch (error) {
        console.log("Error while updating a users is_active status",error)
    }
}