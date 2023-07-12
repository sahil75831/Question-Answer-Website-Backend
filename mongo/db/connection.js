const mongoose = require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/BlogUsers")
.then(()=>{console.log("connected sucessfully to mongo")})
.catch((err)=>{console.log("conntion error",err)})