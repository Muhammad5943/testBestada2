const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema.Types

const slotSchema = new Schema({
    block_code: {
        type: String,
    },
    code: {
        type: String,
        required: true,
        max: 12
    },
    // status: {
    //     type: String,
    //     required: true,
    //     enum: ['available','used']
    // },
    created_at: {
        type: Date,
        default: Date.now()
    },
})

const Slot = mongoose.model("Slot", slotSchema)
module.exports = Slot