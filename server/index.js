import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.js'
import postRoute from './routes/post.js'

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT
// const DB_USER = process.env.DB_USER
// const DB_PASSWORD = process.env.DB_PASSWORD
// const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)

app.get('/', (req, res) => {
    return res.json({ message: 'Everything is ok' })
})

async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/MERN-Blog')
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()
