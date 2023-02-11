const express = require("express")
const router = express.Router()
const AuthMiddleware = require("../middleware/sesion")
const {getItems} = require("../controllers/reservation")
const { createItemValidator } = require("../validator/reservation")


router.get("/",  AuthMiddleware, getItems)

module.exports = router