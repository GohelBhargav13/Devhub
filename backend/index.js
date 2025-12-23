import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"
import { isUserExisting } from "./src/services/user.service.js"
import "dotenv/config"

const app = express()
const PORT = process.env.PORT ?? 4000

export const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174","https://devhub-self.vercel.app"],
        credentials: true
    }
})

// Middlewares (Global)
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174',"https://devhub-self.vercel.app"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.status(200).json({ 'message': "Hello from the root directory of DevHub" })
})

// All Users-Routes
import userRoutes from "./src/routes/user.routes.js"
import postRoutes from "./src/routes/post.routes.js"
import adminRoutes from "./src/routes/admin.routes.js"

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/post", postRoutes)
app.use("/api/v1/admin", adminRoutes)

// Socket connections
io.on("connection", (socket) => {
    console.log("New connection:", socket.id)

    // New User onboarding
    socket.on("newUser", async({ user_name, user_email, user_password, message }) => {
        try {
            const responseData = await isUserExisting(user_email)
            
            if (responseData?.status) {
               
                const existingUser = responseData.existing_user
                console.log("User already exists:", existingUser)
                io.emit("newUserJoined", {
                    new_user: existingUser,
                    message: `${existingUser?.user_name} is onboarding`
                })
                
                // Optionally broadcast to all users
                // io.emit("newUserJoined", { ... })
            } else {
                socket.emit("userError", { message: "User does not exist" })
            }
        } catch (error) {
            console.error("Error in newUser event:", error)
            socket.emit("userError", { message: "An error occurred" })
        }
    })

    // Active User count
    socket.on("newActiveUser", async({ user_email,total_active,message }) => {
        try {
           const responseData = await isUserExisting(user_email)
           console.log(responseData)
           if(responseData?.status){
                 io.emit("ActiveUsers", { user_email, total_active, message })
           }
            
        } catch (error) {
            socket.emit("userError",{ message: "An error occurred on the active user socket" })
        }
    })

    // Fix: Use socket.on("disconnect") instead of socket.disconnect()
    socket.on("disconnect", () => {
        console.log("Connection disconnected:", socket.id)
    })
})

server.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})