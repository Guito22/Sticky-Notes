const mongoose = require('mongoose')
const {Schema} = mongoose

const noteSchema = new Schema({

    content:{
        type:String,
        required:true,   
    },
    color:{
        type: String,
        enum:["#373737","tomato","blue","orangered","green"],
        required:true,
    },
    important:{
        type:Boolean,
        required:true
    },
    creationDate:{
        type:Date,
        required:true
    },
    editionDate:{
        type:Date,
        
    },

})

const Note = mongoose.model("Note",noteSchema)

module.exports = Note