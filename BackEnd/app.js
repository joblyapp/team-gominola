require("dotenv").config()
const express = require("express");
const bodyParse = require("body-parser")
const cors = require("cors")
const dbConnect = require("./config/mongo")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))
const port = process.env.PORT || 3000

// localhost/api/------
app.use(bodyParse.urlencoded({extended:true}))
app.use(bodyParse.json())

app.use("/api",require("./routes"))

app.listen(port, () => {
    console.log("Tu app esta Lista por http://localhost:"+ port )
})

dbConnect()