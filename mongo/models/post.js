const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    summary:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    // answer:{
    //     type:String,
    //     trim:true,
    //     default:"No Answer Yet..."
    // },
    // answerBy:{
    //     type:String,
    //     trim:true,
    //     default:"None"
    // },
   

    
},{timestamps:true})

const PostModel = new mongoose.model("PostCollection", postSchema)
module.exports = PostModel