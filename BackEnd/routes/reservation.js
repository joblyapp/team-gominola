const express = require("express")
const router = express.Router()
const AuthMiddleware = require("../middleware/sesion")
const {getItems, getBeforeDayItems,getTodayDayItems, getPastDaysItems ,createItem,deleteItem} = require("../controllers/reservation")
const { createItemValidator,deleteValidator } = require("../validator/reservation")

router.get("/",  AuthMiddleware, getItems)
router.get("/beforeDays",  AuthMiddleware, getBeforeDayItems)
router.post("/", createItemValidator, createItem)
router.delete("/:id", deleteValidator,AuthMiddleware, deleteItem)
router.get("/day",  AuthMiddleware, getTodayDayItems)
router.get("/pastdays",  AuthMiddleware, getPastDaysItems)
module.exports = router