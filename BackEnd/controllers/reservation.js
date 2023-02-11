const {reservationModel} = require("../models/index")
const { handleHttpError } = require("../utils/handleError")
const { matchedData } = require("express-validator")

const getItems = async (req,res)=> {
    try{
        const reservations = await reservationModel.find({})
        res.send(reservations)
    }catch(e){
        console.log(e)
        handleHttpError(res,"ERROR AL OBTENER LAS RESERVACIONES")
    }
}

const getDayItems = async (req,res)=> {
    try{
        const reservations = await reservationModel.find({})
        let list = []
        let today = new Date().getDay()
        reservations.forEach(reservation => {
            if (reservation.dateR == today){
                console.log("hola")
            }
        })
        res.send(reservations)
    }catch(e){
        console.log(e)
        handleHttpError(res,"ERROR AL OBTENER LAS RESERVACIONES")
    }
}




module.exports = { getItems }