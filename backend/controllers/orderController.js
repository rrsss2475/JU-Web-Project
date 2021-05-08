const asyncHandler = require("express-async-handler")
const Order = require("../models/orderModel")
const moment = require("moment")

const createOrder = asyncHandler(async (req, res) => {
	const order = new Order({
		user: req.user._id,
		orderItems: req.body.orderItems,
		shippingAddress: req.body.shippingAddress,
		paymentMethod: req.body.paymentMethod,
		totalPrice: req.body.totalPrice,
		status: "Inititated",
	})

	if (req.body.isPaid) {
		order.isPaid = req.body.isPaid
		order.paidAt = req.body.paidAt
		order.paymentResult = req.body.paymentResult
	}

	if (moment().hours() > 22) {
		order.toBeDelivered = moment().add(2, "days")
	} else {
		order.toBeDelivered = moment().add(1, "days")
	}

	const savedOrder = await order.save()
	if (savedOrder) {
		res.json(savedOrder)
	} else {
		res.status(400)
		throw new Error("Failed to create order")
	}
})

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	)
	if (order) {
		res.json(order)
	} else {
		res.status(404)
		throw new Error("Order Not Found")
	}
})

const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		}

		const updatedOrder = await order.save()

		res.json(updatedOrder)
	} else {
		res.status(404)
		throw new Error("Order Not Found")
	}
})

const updateStatusOfOrder = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)
	if (order) {
		if (req.body.status == "Delivered") {
			order.isDelivered = true
			order.deliveredAt = Date.now()
			order.status = req.body.status
			const updatedOrder = await order.save()
			res.json(updatedOrder)
		} else {
			order.status = req.body.status
			const updatedOrder = await order.save()
			res.json(updatedOrder)
		}
	} else {
		res.status(404)
		throw new Error("Order Not Found")
	}
})

module.exports = {
	createOrder: createOrder,
	getOrderById: getOrderById,
	updateOrderToPaid: updateOrderToPaid,
	updateStatusOfOrder: updateStatusOfOrder,
}
