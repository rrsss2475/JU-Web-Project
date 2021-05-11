const jwt = require("jsonwebtoken")
const { User } = require("../models/userModel")
const asyncHandler = require("express-async-handler")

const auth = asyncHandler(async (req, res, next) => {
	const token = req.headers.authorization
	if (!token) return res.status(400).json("Access Denied!")

	const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
	req.user = await User.findById(decoded.id).select("-password")
	next()
})

// const admin = (req, res, next) => {
// 	if(req.user && req.user.isAdmin) {
// 		next()
// 	}
// 	else  {
// 		res.status(404)
// 		throw new Error("Not authorized as an admin");
// 	}
// }
module.exports = { 
	auth: auth, 
	//admin: admin 
}
