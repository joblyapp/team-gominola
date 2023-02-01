const mongoose = require("mongoose")
const Schema = mongoose.Schema

const StorageSheme = new mongoose.Schema(
    {
        url: {
            type: String,
        },
        filename: {
            type: String,
        },
    },
    {
        timestamps: true, //Todo CreatedAt, updatedAt,
        versionKey: false
    }
)

module.exports = mongoose.model("storage", StorageSheme)