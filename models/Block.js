const mongoose = require("mongoose")
const Schema = mongoose.Schema

const blockSchema = new Schema({
    code: {
        type: String,
        required: true,
        max: 12
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const Block = mongoose.model("Block", blockSchema)
module.exports = Block