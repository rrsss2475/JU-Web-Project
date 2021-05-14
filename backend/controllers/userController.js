const { User } = require("../models/userModel")
const Product = require("../models/productModel")
const Order = require("../models/orderModel")
const {
	registerValidate,
	updateValidate,
} = require("../validations/registerValidation")
const loginValidation = require("../validations/loginValidation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const sortByProperty = require("../utils/userUtils")
const Booking = require("../models/bookingModel")

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
		const { error } = updateValidate(req.body)
		if (error) {
			res.status(400)
			throw new Error(error.details[0].message)
		}
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
			zip: req.body.zip,
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

const cart = asyncHandler(async (req, res) => {
	const user = await User.findById(req.body.userid)
	res.json(user.cart)
})

const addToCart = asyncHandler(async (req, res) => {
	const user = await User.findById(req.body.userid)
	const product = await Product.findById(req.body.productid)

	for (var item in user.cart) {
		if (user.cart[item].product == req.body.productid) {
			if (!product.isWeighted || user.cart[item].weight == req.body.weight) {
				user.cart[item].qty = Number(user.cart[item].qty) + Number(req.body.qty)
				const lmt = 10
				if (Number(user.cart[item].qty) > lmt) {
					res.status(400)
					throw new Error("Purchase Limit Exceeded")
				}
				if (Number(user.cart[item].qty) <= 0) {
					res.status(400)
					throw new Error("Qty cannot be less than 1")
				}

				await user.save()
				return res.json(user.cart)
			}
		}
	}
	if (product.isWeighted)
		await user.cart.push({
			product: req.body.productid,
			qty: req.body.qty,
			weight: req.body.weight,
		})
	else await user.cart.push({ product: req.body.productid, qty: req.body.qty })
	await user.save()
	res.json(user.cart)
})

const deleteFromCart = asyncHandler(async (req, res) => {
	const user = await User.findById(req.body.userid)
	const product = await Product.findById(req.body.productid)
	const currCart = []
	for (var item in user.cart) {
		if (user.cart[item].product == req.body.productid) {
			if (!product.isWeighted || user.cart[item].weight == req.body.weight)
				continue
		}
		currCart.push(user.cart[item])
	}
	user.cart = currCart
	await user.save()
	return res.json(user.cart)
})

const resetUserCart = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		user.cart = []
		await user.save()
		return res.json({ message: "Cart Reset" })
	} else {
		res.status(404)
		throw new Error("User Not Found")
	}
})

const getAllOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id }).sort({
		createdAt: "desc",
	})

	if (orders) {
		return res.json(orders)
	} else {
		res.json(404)
		throw new Error("Orders not found")
	}
})

const getAllBookings = asyncHandler(async (req, res) => {
	const bookings = await Booking.find({ user: req.user._id }).sort({
		createdAt: "desc",
	})

	if (bookings) {
		return res.json(bookings)
	} else {
		res.json(404)
		throw new Error("Bookings not found")
	}
})

module.exports = {
	register: register,
	login: login,
	getUserProfile: getUserProfile,
	updateUserProfile: updateUserProfile,
	getUserAddresses: getUserAddresses,
	addUserAddress: addUserAddress,
	cart: cart,
	addToCart: addToCart,
	deleteFromCart: deleteFromCart,
	resetUserCart: resetUserCart,
	getAllOrders: getAllOrders,
	getAllBookings: getAllBookings,
}
