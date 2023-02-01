const express = require("express")
const router = express.Router()
const {createItem,getItems,getItem,deleteItem,updateItems} = require("../controllers/category")
const {validatorCreateCategory,validatorIdCategory,validatorUpdate} = require("../validator/category")
const authMiddleware = require("../middleware/sesion")

router.get("/", getItems)
router.get("/:id", authMiddleware , validatorIdCategory, getItem)
router.delete("/:id", authMiddleware , validatorIdCategory, deleteItem)
router.put("/:id", authMiddleware , validatorUpdate,updateItems)
router.post("/", authMiddleware , validatorCreateCategory,createItem)

module.exports = router