const { handleHttpError } = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const {usersModel} = require("../models/index")

const authMiddleware = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            handleHttpError(res, "NEED_SESSION", 401)
            return
        }
        const token = req.headers.authorization.split(" ").pop()
        const dataToken = await verifyToken(token)

        if (!dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOEKN",401)
            return
        }

        const user = await usersModel.findById(dataToken._id)
        req.user = user

        next()

    } catch (e) {
        handleHttpError(res, "ERROR_TOKEN",401)
    }
}

module.exports = authMiddleware