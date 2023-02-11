const { matchedData } = require("express-validator")
const { categoryModel } = require("../models/index")
const { handleHttpError } = require("../utils/handleError")

const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        console.log(body)
        const category = await categoryModel.create(body)
        res.send(category)
    } catch (e) {
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
}

const getItems = async (req, res) => {
    try {
        const category = await categoryModel.find({}).populate("imageId").populate({
            path: "products",
            populate: {
                path: "imageId"
            }
        }).then(category => {
            res.json(category)
        })

    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
}
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const category = await categoryModel.findById({ _id: id }).populate("imageId").populate({
            path: "products",
            populate: {
                path: "imageId"
            }
        }).then(category => {
            res.send(category)
        })
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const category = await categoryModel.findById(id).remove()
        res.send(category)
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
}

const updateItems = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req)
        console.log(id, body)
        const data = await categoryModel.findByIdAndUpdate(
            id, body
        )
        const dataActu = await categoryModel.find({ _id: id }).populate("imageId")
        res.send(data)
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERROR_UPDATE_PRODUCTS")
    }
}






module.exports = { createItem, getItems, getItem, deleteItem, updateItems }