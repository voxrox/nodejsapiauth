const jwt=require("jsonwebtoken")


const verifytoken=(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token)return res.status(401).send("access denied")
    try{
        var verify=jwt.verify(token,process.env.SECRET) //verify contains user id
        req.user=verify
        next()
    }
    catch(err){
        res.status(400).send("invalid token")
    }
}

module.exports=verifytoken