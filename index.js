const express = require("express")
const app = express()
require('dotenv').config();
require("./mongo/db/connection")
const cors = require("cors")
const BASE_URL = process.env.BASE_URL
app.use(cors({credentials:true, origin:"http://localhost:3000", methods:["GET", "POST", "PATCH", "DELETE"]}))
// app.use(cors())
const cookieparser=require('cookie-parser');

app.use(express.json())
app.use(cookieparser())
const PORT = 8000
const router = require("./mongo/routes/blogUserRoutes")
app.use(router)


app.listen(PORT, ()=>{
    console.log(`succesfully conncected to port ${PORT}`)
})

