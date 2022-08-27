const mongoose = require("mongoose")
const Schema = mongoose.Schema

const carSchema = new Schema({
    plat_number: {
        type: String,
        required: true,
        max: 8
    }
})

const Car = mongoose.model("Car", carSchema)
module.exports = Car