const express =require("express")
const route=express.Router()
const verifytoken=require("../verifytoken")

route.get('/',verifytoken,(req,res)=>{
    res.send(req.user)  //provides user id who logged in
})

module.exports=route