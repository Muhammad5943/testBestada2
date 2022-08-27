const mongoose = require("mongoose")
const Schema = mongoose.Schema
const mongoseDelete = require('mongoose-delete')
const { ObjectId } = mongoose.Schema.Types

const parkingSchema = new Schema({
    block_id: {
        type: ObjectId,
        ref: "Block",
    },
    slot_id: {
        type: ObjectId,
        ref: "Slot",
    },
    car_id: {
        type: ObjectId,
        ref: "Car",
    }
})

parkingSchema.plugin(mongoseDelete, { deleted: true, overrideMethods: 'all' })

const Parking = mongoose.model("Parking", parkingSchema)
module.exports = Parking