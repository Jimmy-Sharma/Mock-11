const jwt=require("jsonwebtoken")
require("dotenv").config()


const authen =(req,res,next)=>{
    let token= req.headers.authorization

    if(token){
        const decode=jwt.verify(token, process.env.secretCode)
        if(decode){
            const userID=decode.userID
            req.body.userID=userID
            next()
        }else{
            res.status(400).send({
                "msg":"Wrong Credentials"
            })
        }
    }else{
        res.status(400).send({
            "msg":"Please login first"
        })
    }
}
module.exports={
    authen
}