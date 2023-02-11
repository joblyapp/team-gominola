const express = require("express")
const router = express.Router()
const {validatorCreateProduct,validatorEditorProduct,validatorGetItem} = require("../validator/product")
const {createItem,updateItem,getItems,getItem,deleteItem} = require("../controllers/product")
const authMiddleware = require("../middleware/sesion")

router.post("/", validatorCreateProduct,authMiddleware, createItem)
router.get("/", authMiddleware, getItems)
router.get("/:id", validatorGetItem,authMiddleware, getItem)
router.put("/:id",  validatorEditorProduct, authMiddleware, updateItem)
router.delete("/:id", validatorGetItem,authMiddleware, deleteItem)


module.exports = router