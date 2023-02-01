const express = require("express")
const { Login, Register, createSuperUser } = require("../controllers/auth")
const router = express.Router()
const { validatorRegister, validatorLogin } = require("../validator/auth")

router.post("/login", validatorLogin, Login)
router.get("/createSuperUser", createSuperUser)



module.exports = router