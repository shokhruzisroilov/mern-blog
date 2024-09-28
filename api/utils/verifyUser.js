import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyToken = (req, res, next) => {
	const token = req.cookies.access_token // Ensure this cookie is set
	if (!token) {
		return next(errorHandler(401, 'Unauthorized: No token provided'))
	}
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			// Check for specific JWT errors
			return next(
				errorHandler(
					401,
					err.name === 'TokenExpiredError'
						? 'Unauthorized: Token expired'
						: 'Unauthorized: Invalid token'
				)
			)
		}
		req.user = user // Attach the user info to the request
		next() // Call the next middleware
	})
}
