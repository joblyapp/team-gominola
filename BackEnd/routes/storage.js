const express = require("express")
const router = express.Router()
const uploadMiddleware = require("../utils/handleStorage")
const {createItem,getItems,getItem, updateItem, deleteItem} = require("../controllers/storage")
const { validatorCreateItem, validatorGetItem} = require("../validator/storage")
const authMiddleware = require("../middleware/sesion")


router.get("/", authMiddleware, (getItems))
router.post("/" , uploadMiddleware.single("myfile"),authMiddleware, createItem)
router.get("/:id" , validatorGetItem ,authMiddleware,getItem)
router.put("/:id" , uploadMiddleware.single("myfile"),validatorGetItem,authMiddleware, updateItem)
router.delete("/:id" , validatorGetItem,authMiddleware,deleteItem)

module.exports = router