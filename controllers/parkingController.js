const express = require("express")
const expressAsyncHandler = require('express-async-handler')
const Block = require("../models/Block")
const Slot = require("../models/Slot")
const Car = require("../models/Car")
const Parking = require("../models/Parking")

const parkingRouter = express.Router()

parkingRouter.get(
    "/available",
    expressAsyncHandler(async (req, res) => {
        const parkingUsed = await Parking.find({ deleted: false })
        let slotArray = []
        for (let i = 0; i < parkingUsed.length; i++) {
            slotArray.push(parkingUsed[i].slot_id)
        }

        let blockArray = []
        for (let j = 0; j < parkingUsed.length; j++) {
            blockArray.push(parkingUsed[j].block_id)
        }

        const slotAvailable = await Slot.find({ _id: { $nin: slotArray } })
        const blockAvailable = await Block.find({ _id: { $nin: blockArray } })

        res.status(200).json({
            slotAvailableCount: slotAvailable.length,
            slotAvailable: slotAvailable,
            blockAvailableCount: blockAvailable.length,
            blockAvailable: blockAvailable
        })
    })
)

parkingRouter.post(
    "/create",
    expressAsyncHandler(async (req, res) => {
        try {
            const slotUsed = await Parking.findOne({ slot_id: req.body.slot_id, deleted: false })
            if (slotUsed) {
                res.status(200).json({
                    status: 200,
                    message: "Slot already used"
                })
            }

            const findCar = await Parking.findOne({ car_id: req.body.car_id, deleted: false })
            if (findCar) {
                res.status(200).json({
                    status: 200,
                    message: "This car already parking in other block and slot"
                })
            }

            const parking = await new Parking({
                block_id: req.body.block_id,
                slot_id: req.body.slot_id,
                car_id: req.body.car_id
            })

            if (!slotUsed && !findCar) {
                await parking.save()
            }
            res.status(201).json({
                status: 201,
                message: "Vehicle Parking created",
                parking: parking
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    })
)

parkingRouter.delete(
    "/destroy/parking_id=:parking_id",
    expressAsyncHandler(async (req, res) => {
        let deleted
        try {
            const findParking = await Parking.findOne({ _id: req.params.parking_id, deleted: false })

            await findParking.delete()
            deleted = { deleted: true }
            
            res.status(204).json({
                status: 204,
                message: "Vehicle Parking destroyed",
                deleted: deleted
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    })
)

module.exports = parkingRouter