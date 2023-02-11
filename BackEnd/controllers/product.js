const { handleHttpError } = require("../utils/handleError")
const { productsModel } = require("../models/index")
const { matchedData } = require("express-validator")



const createItem = async (req, res) => {
    try {
        req = matchedData(req)
        const product = await productsModel.create(req)
        const data = await productsModel.findById(product.id).populate("imageId")
        res.send(data)
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
}

const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req)
        console.log(id,body)
        const data = await productsModel.findByIdAndUpdate(
            id, body
        )
        const dataActu = await productsModel.findById(id).populate("imageId")
        res.send(dataActu)
    } catch (e) {
        handleHttpError(res, "ERROR_UPDATE_ITEM")
    }
}

const getItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        console.log(id)
        const data = await productsModel.findById(id).populate("imageId")
        res.send( data )
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

const getItems = async (req, res) => {
    try {
        const data = await productsModel.find({}).populate("imageId")
        res.send( data )
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
}

const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const data = await productsModel.findById(id).remove()
        res.send( data )
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
}

module.exports = { createItem,updateItem,getItems,getItem,deleteItem}
