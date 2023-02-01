const { matchedData } = require("express-validator")
const { usersModel } = require("../models/index")
const { handleHttpError } = require("../utils/handleError")
const { encrypt, compare } = require("../utils/handlePassword")
const { tokenSign, verifyToken } = require("../utils/handleJwt")
const PUBLIC_URL = process.env.PUBLIC_URL
/**
 * Controller encargado de hacer registros
 * @param {} req 
 * @param {*} res 
 */
const Register = async (req, res) => {
    try {
        req = matchedData(req)
        const hashPassword = await encrypt(req.password)
        const body = { ...req, password: hashPassword }
        const dataUser = await usersModel.create(body)
        dataUser.set("password", undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
        res.send( data )
    } catch (e) {
        handleHttpError(res, "ERROR_REGISTER")
    }
}

const createSuperUser = async (req, res) => {
    try {
        const hashPassword = await encrypt("limesylimones@admin")
        const body = { name:"limes y limones", email:"limesylimones@gmail.com", password: hashPassword }
        const dataUser = await usersModel.create(body)
        dataUser.set("password", undefined, { strict: false })

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }

        res.send( data )

    } catch (e) {
        handleHttpError(res, "ERROR_REGISTER")
    }
}

/**
 * Controller encargado de hacer login
 * @param {} req 
 * @param {*} res 
 */
const Login = async (req, res) => {
    try {
        const { email, password } = matchedData(req)
        const dataUser = await usersModel.findOne({ email: email }).select("password name email")
        if (!dataUser){
            handleHttpError(res, "El usuario no existe",404)
            return
        }
        const isCorrect = await compare(password, dataUser.password)

        if (!isCorrect){
            handleHttpError(res, "PASSWORD_INVALID",401)
            return
        }

        if (isCorrect) {
            dataUser.set("password", undefined, { strict: false })
            const data = {
                token: await tokenSign(dataUser),
                user: dataUser
            }
            res.send(data )
        } else {
            res.send({})
        }

    } catch (e) {
        handleHttpError(res, "ERROR_LOGIN")
    }
}

module.exports = { Login, Register, createSuperUser }