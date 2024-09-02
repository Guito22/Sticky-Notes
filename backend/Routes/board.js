const express = require('express');
const router = express.Router()

const Board = require("../Models/Board")
const isLogged = require("../loginVerification");
const User = require('../Models/User');
const Note = require('../Models/Note');



router.post("/:userId/newBoard",isLogged,async(req,res)=>{
    try{
        const {userId} = req.params
        const user = await User.findById(userId)
        const newBoard = new Board({...req.body,user})
        await newBoard.save()
        user.boards.push(newBoard)
        await user.save()
        res.send("success")
    }
    catch (e){
        res.send(e)
    }
})

router.patch("/:userId/editBoard/:boardId",isLogged, async(req,res)=>{
    try{
        const {boardId} = req.params
        const board = await Board.findByIdAndUpdate(boardId,req.body)
        res.send("success")

    }
    catch (e){
        res.send(e)
    }
})
router.patch("/:userId/:noteIndex1/:noteIndex2",isLogged,async(req,res)=>{
    try{

        const {userId,noteIndex1,noteIndex2} = req.params
        const user = await User.findById(userId)
        if(user.boards[noteIndex1] && user.boards[noteIndex2]){
            const aux = user.boards[noteIndex1]
            user.boards[noteIndex1] = user.boards[noteIndex2]
            user.boards[noteIndex2] = aux
        }
        await user.save()
        res.send("success")
    }
    catch(e){
        res.send(e)
    }
})

router.delete("/:userId/deleteBoard/:boardId",isLogged,async(req,res)=>{
    try{
        const {userId,boardId} = req.params
        const user = await User.findById(userId)
        const board = await Board.findById(boardId)
        for (const i of board.notes) {
            await Note.findByIdAndDelete(i._id)
        }
        await Board.findByIdAndDelete(boardId)
        user.boards = user.boards.filter((i)=>{
            return i._id!=boardId
        })
        await user.save()
        res.send("success")

    }
    catch (e){
        res.send(e)
    }
})

module.exports = router