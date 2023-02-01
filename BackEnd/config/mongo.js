const mongoose = require("mongoose")    

const dbConnect = () =>{
    const DB_URI = process.env.DB_URI || "mongodb+srv://carlos:carlos123@cluster0.fkvysml.mongodb.net/?retryWrites=true&w=majority"
    mongoose.connect(DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    },(err,res)=>{
        if (!err){
            console.log("conexion Correcta")
        } else {
            console.log("Error de conexion")
        }
    })
}
mongoose.set('strictQuery', false)
module.exports = dbConnect