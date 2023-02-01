const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateProduct = [
    check("name")
        .exists()
        .notEmpty(),
    check("description")
        .exists(),
    check("price")
        .exists()
        .notEmpty()
        .isFloat(),
    check("imageId")
        .exists()
        .isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
const validatorEditorProduct = [
    check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
    check("name")
        .exists()
        .notEmpty(),
    check("description")
        .exists(),
    check("price")
        .exists()
        .notEmpty()
        .isFloat(),
    check("imageId")
        .exists()
        .isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
const validatorGetItem = [
    check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]




module.exports = { validatorCreateProduct, validatorEditorProduct, validatorGetItem }