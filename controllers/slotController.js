const express = require("express")
const expressAsyncHandler = require('express-async-handler')
const Slot = require("../models/Slot")
const data = require('../seeder/data')

const slotRouter = express.Router()

// slot seeder
slotRouter.post(
    "/slot-seed",
    expressAsyncHandler(async (req, res) => {
        try {
            const slot = await Slot.insertMany(data.slots)
            
            res.status(201).json({
                status: 201,
                message: 'Slot Seed',
                slot: slot
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    })
)

module.exports = slotRouter