import express from "express"
import cookieParser from "cookie-parser"
import "dotenv/config"


const app = express()
const PORT = process.env.PORT ?? 4000

// Middlewares ( Global )
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())
// app.use(checkTokenExists)

app.get("/",(req,res) => {
    res.status(200).json({ 'message': "Hello from the root directory of DevHub" })
})

// All Users-Routes
import userRoutes from "./src/routes/user.routes.js"
import postRoutes from "./src/routes/post.routes.js"
import adminRoutes from "./src/routes/admin.routes.js"

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/post",postRoutes)
app.use("/api/v1/admin",adminRoutes)

app.listen(PORT,() => {
    console.log(`App is running on the port ${PORT}`)
})