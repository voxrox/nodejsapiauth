const express=require("express")
const app=express()
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const authroute=require("./routes/auth")
const postroute=require("./routes/posts")

dotenv.config()

mongoose.connect(process.env.DBconnect).then(()=>{console.log("connected to DB")}).catch((err)=>{console.log(err)})

app.use(express.json())

app.use("/api/users",authroute)
app.use("/api/posts",postroute)


app.listen(process.env.PORT,()=>{
    console.log(`server started with port ${process.env.PORT}`)
})