const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ReservationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        phone: {
            type: Number,
            require: true,
        },
        dateR: {
            type: Date,
            require: true
        },
        hourR: {
            type: String,
            require: true
        },
        people: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true, //Todo CreatedAt, updatedAt,
        versionKey: false
    }
)

module.exports = mongoose.model("reservation", ReservationSchema)