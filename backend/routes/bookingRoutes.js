const express = require("express")
const { auth, admin } = require("../middlewares/authMiddleware")
const router = express.Router()
const {
	createBooking,
	getBookingById,
	getAllBookings,
	updateBookingToPaid,
	updateStatusOfBooking,
	deleteBooking,
} = require("../controllers/bookingController")

router.route("/").post(auth, createBooking).get(auth, admin, getAllBookings)
router
	.route("/admin/:id")
	.delete(auth, admin, deleteBooking)
	.put(auth, admin, updateStatusOfBooking)
router.route("/:id").get(auth, getBookingById)
router.route("/:id/pay").put(auth, updateBookingToPaid)
router.route("/:id/status").put(auth, updateStatusOfBooking)

module.exports = router
