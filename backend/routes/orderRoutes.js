const express = require("express");
const {auth, admin} = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  updateStatusOfOrder,
} = require("../controllers/orderController");

router.route("/").post(auth, createOrder);
router.route("/:id").get(auth, getOrderById);
router.route("/:id/pay").put(auth, updateOrderToPaid);
router.route("/:id/status").put(auth, updateStatusOfOrder);

module.exports = router;
