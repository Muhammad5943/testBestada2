const express = require("express")
const expressAsyncHandler = require('express-async-handler')
const Car = require("../models/Car")
const data = require('../seeder/data')

const carRouter = express.Router()

// cars seeder
carRouter.post(
    "/car-seed",
    expressAsyncHandler(async (req, res) => {
        try {
            const car = await Car.insertMany(data.cars)
            
            res.status(201).json({
                status: 201,
                message: 'Car Seed',
                car: car
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    })
)

// create cars
carRouter.post(
    "/create",
    expressAsyncHandler(async (req, res) => {
        try {
            const car = new Car({
                plat_number: req.body.plat_number
            })

            await car.save()
            
            res.status(201).json({
                status: 201,
                message: 'Car Created',
                car: car
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    })
)

module.exports = carRouter 