const express = require('express')
const bodyparser = require('body-parser')
const speakeasy = require('speakeasy')


const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.post("/secret",(req,res,next)=>{
    let secret = speakeasy.generateSecret({length:20})
    res.send({"secret":secret.base32})
})

app.post("/generate",(req,res,next)=>{
   
    res.send({
        "token":speakeasy.totp({
            secret:req.body.secret,
            encoding:"base32"
        }),
        "remaining":(30-Math.floor((new Date().getTime()/1000.0 % 30)))
    })
})


app.post("/validate",(req,res,next)=>{

    res.send({
        "valid":speakeasy.totp.verify({
            secret:req.body.secret,
            encoding:"base32",
            token:req.body.token,
            window:0
        })
    })

})

app.listen(3000,()=>{
    
    console.log('runing server in localhost...');
    
})