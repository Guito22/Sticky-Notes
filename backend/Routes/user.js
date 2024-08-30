const express = require('express');
const router = express.Router()
const bcrypt = require('bcrypt');

const User = require("../Models/User")
const Board = require("../Models/Board")
const Note = require("../Models/Note")
const isLogged = require("../loginVerification")

router.get("/:userId",isLogged,async(req,res)=>{
    try{

        const {userId} = req.params
        if(req.session.user===userId){
            const user = await User.findById(userId).populate("boards")
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
    const {name,email,password} = req.body
    const colors = ["turquoise","goldenrod","salmon","pink","green","purple"]
    const color = colors[Math.floor(Math.random()*colors.length)]
    const existEmail = await User.findOne({email})
    if(existEmail){
        res.send(false)
    }
    else{
        //to encrypt password
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);
        const newUser = new User({name,email,password:hash,theme:"light",color})
        
        const firstBoard = new Board({
            icon:"home",
            title:"My first board",
            user:newUser
        })
        
        const firstNote = new Note({
            content:"My first note",
            color:"blue",
            important:true,
            creationDate: new Date().toISOString(),
            board:firstBoard
        })
        await firstNote.save()
        firstBoard.notes.push(firstNote)

        await firstBoard.save()
        newUser.boards.push(firstBoard)
        
        await newUser.save()
        res.send(true)
    }
})
//logout route
router.post("/:userId/logout",isLogged, async (req,res)=>{
    try{
        
        const {userId} = req.params
            
        req.session.destroy((err)=>{
            
        })
            
        res.send("success")
    }
    catch (e){
        res.send(e)
    }
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
        res.send(e)
    }
})
router.patch("/:userId/toggleTheme",isLogged,async(req,res)=>{
    try{
        const {userId} = req.params
        const user = await User.findById(userId)
        user.theme = user.theme === "dark" ? "light" : "dark"
        await user.save()
        res.send(user.theme)
    }
    catch(e){
        res.send(e)
    }
})

module.exports = router