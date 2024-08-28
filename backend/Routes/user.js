const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const User = require("../Models/User")
const isLogged = require("../loginVerification")

router.get("/:userId",isLogged,async(req,res)=>{
    try{

        const {userId} = req.params
        if(req.session.user===userId){
            const user = await User.findById(userId)
            res.send(user)
        }
        else{
            res.send("Error")
        }
    }
    catch(e){
        res.send(e);
    }
})
//login route
router.post("/login", async (req,res)=>{
    const {email,password} = req.body
    const u = await User.findOne({email})

    if(u){
        const isPw = await bcrypt.compare(password,u.password)
        if(isPw){
                
            req.session.user= u.id
            res.send(u.id)
        }
        else{
            res.send("Error")
        }
    }
    else{
        res.send("Error")
    }

})

//sign up route
router.post("/signup", async (req,res)=>{
    const {name,email,password,theme,color} = req.body
    const existEmail = await User.findOne({email})
    if(existEmail){
        res.send(false)
    }
    else{
        //to encrypt password
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({name,email,password:hash,theme,color})
        await newUser.save()
        res.send(true)
    }
})
//logout route
router.post("/:userId/logout", async (req,res)=>{
    const {userId} = req.params
    if(req.session.user){
        const isId = userId==req.session.user
        if(isId){

            req.session.destroy((err)=>{
    
            })
        }
    
    }
    res.send("whatever")
})
router.patch("/edit/:userId",isLogged,async(req,res)=>{
    try{
        const {userId} = req.params
        const {name,email,password} = req.body
        const user = await User.findById(userId)
        const userWithEmail = await User.findOne({email})
        if(!userWithEmail || userWithEmail.id===req.session.user){
            await user.updateOne({name,email,password})
            res.send("Success")
        }
        else{
            res.send("That email is already registered")
        }

    }
    catch(e){
        console.log(e);
        res.send(e)
    }
})

module.exports = router