const express = require("express")
const auth = require("../middlewares/authMiddleware")
const router = express.Router()
const {
	createBooking,
	getBookingById,
	updateBookingToPaid,
	updateStatusOfBooking,
} = require("../controllers/bookingController")

router.route("/").post(auth, createBooking)
router.route("/:id").get(auth, getBookingById)
router.route("/:id/pay").put(auth, updateBookingToPaid)
router.route("/:id/status").put(auth, updateStatusOfBooking)

module.exports = router
