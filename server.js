const express = require('express')
const mongoose = require('mongoose')
const carController = require('./controllers/carController')
const blockController = require('./controllers/blockController')
const slotController = require('./controllers/slotController')
const parkingController = require('./controllers/parkingController.js')

const app = express()

require('dotenv').config()
const PORT = process.env.PORT

// config mongoose
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true
    },
    (err) => {
        if (err) {
            console.error({
                message: 'Failed to connect to MongoDB',
                error: err
            })
        } else {
            console.log("Database Connected")
        }
    }
)
    
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/* Test API Connected */
app.get('/', (req, res) => {
    console.log('Test API')
    res.status(200).json({
        message: 'Test API'
    })
})

app.use('/api/car', carController)
app.use('/api/block', blockController)
app.use('/api/slot', slotController)
app.use('/api/parking', parkingController)

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
})