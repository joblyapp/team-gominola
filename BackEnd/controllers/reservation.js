const { reservationModel } = require("../models/index")
const { handleHttpError } = require("../utils/handleError")
const { matchedData } = require("express-validator")

const getBeforeDayItems = async (req, res) => {
    try {
        const reservations = await reservationModel.find({}).sort('dateR').sort("hourR")
        let list = []
        var d = new Date();
        d = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        var yyyymmdd = d.toISOString().slice(0, 10);
        let today = new Date(yyyymmdd)
        today.setUTCHours(0,0,0,0)
        reservations.forEach(reservation => {
            let resFecha = new Date(reservation.dateR)
            resFecha.setHours(0, 0, 0, 0)
            console.log(today)
            console.log(resFecha)
            if ((today.getTime() < resFecha.getTime())) {
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
        const reservations = await reservationModel.find({}).sort({ 'dateR': -1 }).sort("hourR")
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
        var d = new Date();
        d = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        var yyyymmdd = d.toISOString().slice(0, 10);
        let x = new Date(yyyymmdd)
        x.setUTCHours(0,0,0,0)
        reservations.forEach(reservation => {
            let day = new Date((reservation.dateR))
            day.setUTCHours(0, 0, 0, 0)
            if ((x.getTime() == day.getTime())) {
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
        var d = new Date();
        d = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
        var yyyymmdd = d.toISOString().slice(0, 10);
        let today = new Date(yyyymmdd)
        today.setUTCHours(0,0,0,0)
        reservations.forEach(reservation => {
            let day = new Date((reservation.dateR))
            day.setUTCHours(0, 0, 0, 0)
            console.log(today)
            console.log(day)
            if ((today.getTime() > day.getTime())) {
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