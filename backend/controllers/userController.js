const { User } = require("../models/userModel")
const registerValidation = require("../validations/registerValidation")
const loginValidation = require("../validations/loginValidation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const register = asyncHandler(async (req, res) => {
	const { error } = registerValidation(req.body)
	if (error) {
		res.status(400)
		throw new Error(error.details[0].message)
	}

	const emailExists = await User.findOne({ email: req.body.email })
	if (emailExists) {
		res.status(400)
		throw new Error("Email already exists")
	}

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword,
	})

	const savedUser = await user.save()
	res.json(savedUser)
})

const login = asyncHandler(async (req, res) => {
	const { error } = loginValidation(req.body)
	if (error) {
		res.status(400)
		throw new Error(error.details[0].message)
	}

	const user = await User.findOne({ email: req.body.email })
	if (!user) {
		res.status(401)
		throw new Error("Invalid Email")
	}

	const validPass = await bcrypt.compare(req.body.password, user.password)
	if (!validPass) {
		res.status(401)
		throw new Error("Invalid Password")
	}
	const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET)
	res.header("Authorization", token).json({
		_id: user._id,
		name: user.name,
		email: user.email,
		isAdmin: user.isAdmin,
		token: token,
	})
})

const cart = asyncHandler(async (req,res) => {
	const userid = req.body.userid;
	const productid = req.body.productid;
	const qty = req.body.qty;
	console.log(userid, productid, qty);
})

const getUserDetails = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error("User not found")
	}
})

module.exports.register = register
module.exports.login = login
module.exports.cart = cart
module.exports.getUserDetails = getUserDetails
