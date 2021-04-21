const { User } = require("../models/userModel")
const registerValidation = require("../validations/registerValidation")
const loginValidation = require("../validations/loginValidation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const sortByProperty = require("../utils/userUtils")

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

	const token = jwt.sign({ id: savedUser._id }, process.env.TOKEN_SECRET)

	if (savedUser) {
		res.status(201).json({
			_id: savedUser._id,
			name: savedUser.name,
			email: savedUser.email,
			isAdmin: user.isAdmin,
			token: token,
		})
	}
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

const getUserProfile = asyncHandler(async (req, res) => {
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

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10)
			const hashedPassword = await bcrypt.hash(req.body.password, salt)
			user.password = hashedPassword
		}

		const updatedUser = await user.save()
		const token = jwt.sign({ id: updatedUser._id }, process.env.TOKEN_SECRET)

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: token,
		})
	} else {
		res.status(404)
		throw new Error("User Not Found")
	}
})

const getUserAddresses = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	const addresses = user.address
	addresses.sort(sortByProperty("lastUsed"))

	if (user) {
		res.json(addresses)
	} else {
		res.status(404)
		throw new Error("User Not Found")
	}
})

const addUserAddress = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		const newAddress = {
			name: req.body.name,
			street: req.body.street,
			city: req.body.city,
			state: req.body.state,
			country: req.body.country,
			zip: Number(req.body.zip),
			lastUsed: new Date(),
		}

		await user.address.push(newAddress)
		await user.save()
		res.status(201).json({ message: "Address Added Successfully" })
	} else {
		res.json(404)
		throw new Error("User Not Found")
	}
})

module.exports.register = register
module.exports.login = login
module.exports.getUserProfile = getUserProfile
module.exports.updateUserProfile = updateUserProfile
module.exports.getUserAddresses = getUserAddresses
module.exports.addUserAddress = addUserAddress
