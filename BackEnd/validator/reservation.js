const express = require("express")
const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const createItemValidator = [
    check("name")
        .exists()
        .isString()
        .notEmpty(),
    check("phone")
        .exists()
        .isNumeric()
        .notEmpty(),
    check("dateR")
        .exists()
        .isDate()
        .notEmpty(),
    check("hourR")
        .exists()
        .isString()
        .notEmpty(),
    check("people")
        .exists()
        .isString()
        .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

module.exports = {createItemValidator}