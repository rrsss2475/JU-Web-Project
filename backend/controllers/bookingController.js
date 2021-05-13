const asyncHandler = require("express-async-handler")
const Booking = require("../models/bookingModel")

const createBooking = asyncHandler(async (req, res) => {
	const booking = new Booking({
		user: req.user._id,
		bookingItem: req.body.bookingItem,
		shippingAddress: req.body.shippingAddress,
		paymentMethod: req.body.paymentMethod,
		totalPrice: req.body.totalPrice,
		toBeCompleted: req.body.toBeCompleted,
		status: "Inititated",
	})

	if (req.body.isPaid) {
		booking.isPaid = req.body.isPaid
		booking.paidAt = req.body.paidAt
		booking.paymentResult = req.body.paymentResult
	}

	const savedBooking = await booking.save()
	if (savedBooking) {
		res.json(savedBooking)
	} else {
		res.status(400)
		throw new Error("Failed to create booking")
	}
})

const getBookingById = asyncHandler(async (req, res) => {
	const booking = await Booking.findById(req.params.id)
		.populate({ path: "user", select: "name email" })
		.populate({
			path: "bookingItem.service",
			select: "name category subCategory",
			populate: { path: "category", select: "name" },
		})
		.populate({
			path: "bookingItem.service",
			select: "name category subCategory",
			populate: { path: "subCategory", select: "name" },
		})
	if (booking) {
		res.json(booking)
	} else {
		res.status(404)
		throw new Error("Booking Not Found")
	}
})

const updateBookingToPaid = asyncHandler(async (req, res) => {
	const booking = await Booking.findById(req.params.id)

	if (booking) {
		booking.isPaid = true
		booking.paidAt = Date.now()
		booking.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		}

		const updatedBooking = await booking.save()

		res.json(updatedBooking)
	} else {
		res.status(404)
		throw new Error("Booking Not Found")
	}
})

const updateStatusOfBooking = asyncHandler(async (req, res) => {
	const booking = await Booking.findById(req.params.id)
	if (booking) {
		if (req.body.status == "Completed") {
			booking.isCompleted = true
			booking.completedAt = Date.now()
			booking.status = req.body.status
			const updatedBooking = await booking.save()
			res.json(updatedBooking)
		} else {
			booking.status = req.body.status
			const updatedBooking = await booking.save()
			res.json(updatedBooking)
		}
	} else {
		res.status(404)
		throw new Error("Booking Not Found")
	}
})

module.exports = {
	createBooking: createBooking,
	getBookingById: getBookingById,
	updateBookingToPaid: updateBookingToPaid,
	updateStatusOfBooking: updateStatusOfBooking,
}
