const mongoose = require("mongoose")
const mongoose_delete = require('mongoose-delete');

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            select:false
        },
    },
    {
        timestamps: true, //Todo CreatedAt, updatedAt,
        versionKey: false
    }
)


module.exports = mongoose.model("users", UserScheme)