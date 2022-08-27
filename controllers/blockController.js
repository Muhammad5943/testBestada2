const express = require("express")
const expressAsyncHandler = require('express-async-handler')
const Block = require("../models/Block")
const data = require('../seeder/data')

const blockRouter = express.Router()

// block seeder
blockRouter.post(
    '/block-seed',
    expressAsyncHandler(async (req, res) => {
        try {
            const block = await Block.insertMany(data.blocks)
            
            res.status(201).json({
                status: 201,
                message: 'Block Seed',
                car: block
            })
        } catch (error) {
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    })
)

module.exports = blockRouter