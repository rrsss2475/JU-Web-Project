const router = require("express").Router();
const {
	register,
	login,
	cart,
	getUserProfile,
	getUsers,
	deleteUser,
	updateUserProfile,
	getUserAddresses,
	addUserAddress,
	addToCart,
	deleteFromCart,
	resetUserCart,
	getAllOrders,
	getAllBookings,
	getUserById,
	updateUser,
} = require("../controllers/userController")
const { auth, admin } = require("../middlewares/authMiddleware")

router.route("/").get(auth, admin, getUsers)
router.post("/register", register)
router.post("/login", login)
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile)
router.route("/shipping").get(auth, getUserAddresses).post(auth, addUserAddress)
router.post("/cart", cart)
router.post("/addToCart", addToCart)
router.post("/deleteFromCart", deleteFromCart)
router.route("/resetCart").post(auth, resetUserCart)
router.route("/getOrders").get(auth, getAllOrders)
router.route("/getBookings").get(auth, getAllBookings)
router
	.route("/:id")
	.delete(auth, admin, deleteUser)
	.get(auth, admin, getUserById)
	.put(auth, admin, updateUser)

module.exports = router;
