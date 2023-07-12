const mongoose = require("mongoose")

const blogUsersSchema = new mongoose.Schema({
    userName : {
        type:String,
        min:[4, "name must be greater than 3 characters"],
        max:[10, "name must be less than 10 characters"],
        require:true
    },
    email:{
        type:String,
        min:[5, "email must be greater than 4 characters"],
        max:[34, "email must be less than 35 characters"],
        require:true,
        unique:true
    },
    password:{
        type:String,
        min:[5, "password must be greater than 4 characters"],
        max:[34, "password must be less than 35 characters"],
        require:true,
    }

})

const blogUsersModel = new mongoose.model("BlogUsers", blogUsersSchema)

module.exports = blogUsersModel