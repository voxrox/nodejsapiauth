const joi=require("@hapi/joi")

const registervalidation=(data)=>{
    var schema=joi.object({
        name:joi.string().min(6).required(),
        email:joi.string().min(6).required().email(),
        password:joi.string().min(6).required()
    })
    return schema.validate(data)

    //you may add validation even for login credentials
}

module.exports.registervalidation=registervalidation