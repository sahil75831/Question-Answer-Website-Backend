const mongoose = require("mongoose")

mongoose.connect("mongodb://0.0.0.0:27017/BlogUsers")
.then(()=>{console.log("connected sucessfully to mongo")})
.catch((err)=>{console.log("conntion error",err)})

// const DB = process.env.DATABASE
// const DB = "mongodb+srv://sahilsharma75831quickbrown:DJfhyg61P9LFQLT6@cluster0.rh7cywa.mongodb.net/BlogUsers?retryWrites=true&w=majority"
// mongoose.connect(DB, {
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// }).then(()=>{console.log("connected sucessfully to mongo")}).catch((err)=>{console.log("conntion error",err)})

// useCreateIndex:true,
// useFindAndModify:false,