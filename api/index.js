import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import postRoutes from './routes/post.route.js'

dotenv.config()

mongoose
	.connect(process.env.MONGO)
	.then(() => console.log('Mongodb is connected'))
	.catch(err => console.log(err))

const app = express()

// Enable CORS with default options (allow all origins)
app.use(cors())

app.use(express.json())
app.use(cookieParser())

app.listen(3000, () => {
	console.log('Server is running on port 3000!')
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500
	const message = err.message || 'Internal Server Error'
	res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	})
})
