const mongoose = require('mongoose')
const {Schema} = mongoose

const boardSchema = new Schema({
    title:{
        type:String,
        required:true,
        maxlenght: [20,"tilte cannot be longer than 20 characters"]
    },
    icon:{
        type:String,
        required:true,
        enum:["book","lightbulb","home","rocket","calendar"]
    },
    notes:[{type:Schema.Types.ObjectId,ref:"Note",required:true}]

})

const Board = mongoose.model("Board",boardSchema)

module.exports = Board