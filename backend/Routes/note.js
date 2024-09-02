const express = require('express');
const router = express.Router()

const Board = require("../Models/Board")
const isLogged = require("../loginVerification");
const Note = require('../Models/Note');

router.post("/:userId/:boardId/newNote",isLogged,async(req,res)=>{
    try{
        const {boardId} = req.params
        const board = await Board.findById(boardId)
        const date = new Date().toISOString()
        const newNote = new Note({...req.body,creationDate: date,editionDate:date})
        await newNote.save()
        board.notes.push(newNote)
        await board.save()
        res.send("success")
    }
    catch (e){
        res.send(e)
    }
})
router.patch("/:userId/editNote/:noteId",isLogged,async(req,res)=>{
    try{
        const {noteId} = req.params
        await Note.findByIdAndUpdate(noteId,
            {...req.body,editionDate:new Date().toISOString()}
        )
        res.send("success")
    }
    catch(e){
        res.send(e)
    }
})

router.patch("/:userId/:boardId/:noteIndex1/:noteIndex2",isLogged,async(req,res)=>{
    try{

        const {boardId,noteIndex1,noteIndex2} = req.params
        const board = await Board.findById(boardId)
        if(board.notes[noteIndex1] && board.notes[noteIndex2]){
            const aux = board.notes[noteIndex1]
            board.notes[noteIndex1] = board.notes[noteIndex2]
            board.notes[noteIndex2] = aux
        }
        await board.save()
        res.send("success")
    }
    catch(e){
        res.send(e)
    }
})

router.delete("/:userId/:boardId/deleteNote/:noteId",isLogged,async(req,res)=>{
    try{

        const {boardId,noteId} = req.params
        const board = await Board.findById(boardId)
        await Note.findByIdAndDelete(noteId)
        board.notes = board.notes.filter(i=>{
           return i._id!=noteId
        })
        await board.save()
        res.send("success")
    }
    catch(e){
        res.send(e)
    }

})

module.exports = router