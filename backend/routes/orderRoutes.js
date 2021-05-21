const express = require("express")
const { auth, admin } = require("../middlewares/authMiddleware")
const router = express.Router()
const {
	createOrder,
	getOrderById,
	getAllOrders,
	updateOrderToPaid,
	updateStatusOfOrder,
	deleteOrder,
} = require("../controllers/orderController")

router.route("/").post(auth, createOrder).get(auth, admin, getAllOrders)
router
	.route("/admin/:id")
	.delete(auth, admin, deleteOrder)
	.put(auth, admin, updateStatusOfOrder)

router.route("/:id").get(auth, getOrderById)
router.route("/:id/pay").put(auth, updateOrderToPaid)
router.route("/:id/status").put(auth, updateStatusOfOrder)

module.exports = router
