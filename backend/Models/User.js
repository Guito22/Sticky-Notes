const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlenght: [20,"Name cannot be longer than 40 characters"]
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,

    },
    boards:[{type:Schema.Types.ObjectId,ref:"board"}],
    theme:{
        type:String,
        enum:["light","dark"]
    },
    color:{
        type:String,
        enum:["turquoise","goldenrod","fuchsia","salmon","olive"]
    }
})

const User = mongoose.model("user",userSchema)

module.exports = User