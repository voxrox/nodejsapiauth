const express=require("express")
const route=express.Router()
const userm=require("../models/userm")
const bcryptjs=require("bcryptjs")
const joi=require("@hapi/joi")
const {registervalidation}=require("../validation")
const jwt=require("jsonwebtoken")

route.post("/register",async (req,res)=>{
    const {error}=await registervalidation(req.body)
    if(error){return res.status(400).send(error.details[0].message)}

    var finduser=await userm.findOne({email:req.body.email})
    if(finduser){
        return res.status(400).send("email already exists")
    }       

    const hashsalt=await bcryptjs.genSalt(10)
    var hashedpassword=await bcryptjs.hash(req.body.password,hashsalt)

    var newuser=new userm({
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword
    })
try{
    const saveuser=await newuser.save()
    res.send(saveuser)
}
catch(err){
    res.status(400).send(err.message)
}
}
)

route.post("/login",async(req,res)=>{
    var finduser=await userm.findOne({email:req.body.email})
    if(!finduser){
        return res.status(400).send("email or password is not correct")
    }
     var comparepassword=await bcryptjs.compare(req.body.password,finduser.password)
     if(!comparepassword){
        return res.send("email or password is not correct")
     }      
     //res.send("logged in")
     var token=jwt.sign({id:finduser._id},process.env.SECRET)
     res.header('auth_token',token).send(token)
})

module.exports=route