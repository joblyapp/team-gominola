const { reservationModel } = require("../models/index")
const { handleHttpError } = require("../utils/handleError")
const { matchedData } = require("express-validator")

const getBeforeDayItems = async (req, res) => {
    try {
        const reservations = await reservationModel.find({}).sort('dateR').sort("hourR")
        let list = []
        let today = new Date().getDate()
        reservations.forEach(reservation => {
            let day = new Date(reservation.dateR).getDate() + 1
            if (day > today) {
                list.push(reservation)
            }
        })
        res.send(list)
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL OBTENER LAS RESERVACIONES FUTURAS")
    }
}

const getItems = async (req, res) => {
    try {
        const reservations = await reservationModel.find({}).sort({'dateR':-1}).sort("hourR")
        res.send(reservations)
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL OBTENER LAS RESERVACIONES")
    }
}

const getTodayDayItems = async (req, res) => {
    try {
        const reservations = await reservationModel.find({}).sort('dateR').sort("hourR")
        let list = []
        let today = new Date().getDate()
        reservations.forEach(reservation => {
            let day = new Date(reservation.dateR).getDate() + 1
            if (day == today) {
                list.push(reservation)
            }
        })
        res.send(list)
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL OBTENER LAS RESERVACIONES DE HOY")
    }
}

const getPastDaysItems = async (req, res) => {
    try {
        const reservations = await reservationModel.find({}).sort({ "dateR": -1 }).sort("hourR")
        let list = []
        let today = new Date().getDate()
        reservations.forEach(reservation => {
            let day = new Date(reservation.dateR).getDate() + 1
            if (day < today) {
                list.push(reservation)
            }
        })
        res.send(list)
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL OBTENER LAS RESERVACIONES PASADAS")
    }
}


const createItem = async (req, res) => {
    try {
        req = matchedData(req)
        const reservation = await reservationModel.create(req)
        const data = await reservationModel.findById(reservation.id)
        res.send(data)
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL CREAR LA RESERVACION")
    }
}

const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const reservation = await reservationModel.findByIdAndRemove(id)
        res.send(reservation)
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR AL ELIMINAR LA RESERVACION")
    }
}




module.exports = { getBeforeDayItems, createItem, deleteItem, getTodayDayItems, getPastDaysItems, getItems }