const { matchedData } = require("express-validator")
const { storageModel } = require("../models/index")
const { handleHttpError } = require("../utils/handleError")
const fs = require("fs");

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`

const createItem = async (req, res) => {
    try {
        const { body, file } = req
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send(data)
    } catch(e){
        handleHttpError(res, "ERROR_CREATE_ITEM")
    }
}

const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        const data = await storageModel.findById({ _id: id }).populate("imageId")
        res.send(data)
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEM")
    }
}

const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send(data)
    } catch (e) {
        handleHttpError(res, "ERROR_GET_ITEMS")
    }
}
const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req)
        const data = await storageModel.findOneAndUpdate(
            id, body
        )
        res.send(data)
    } catch (e) {
        handleHttpError(res, "ERROR_UPDATE_ITEM")
    }
}

/**
 * Eliminar un objeto de base de datos
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        const { filename } = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;
        const dataEliminated = await storageModel.deleteOne({ _id: id }); //TODO c:/miproyecto/file-1232.png
        fs.unlinkSync(filePath);
        const data = {
            filePath,
            deleted: dataEliminated,
        };
        res.send(data)
    } catch (e) {
        handleHttpError(res, "ERROR_DELETE_ITEM")
    }
}
module.exports = { createItem, getItem, getItems, updateItem, deleteItem }