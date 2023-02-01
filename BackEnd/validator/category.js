const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateCategory = [
    check("name")
        .exists()
        .notEmpty(),
    check("isFood")
        .exists()
        .isBoolean(),
    check("imageId")
        .exists()
        .isMongoId(),
    check("products")
        .exists()
        .isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]
const validatorIdCategory = [
    check("id")
        .exists()
        .isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorUpdate = [
    check("id")
        .exists()
        .isMongoId(),
    check("name")
        .exists()
        .notEmpty(),
    check("imageId")
        .exists()
        .isMongoId(),
    check("isFood")
        .exists()
        .isBoolean(),
    check("products")
        .exists()
        .isArray(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]





module.exports = { validatorCreateCategory, validatorIdCategory, validatorUpdate}
