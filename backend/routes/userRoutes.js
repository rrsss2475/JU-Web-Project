const router = require("express").Router()
const {
	register,
	login,
	cart,
	getUserProfile,
	getUsers,
	updateUserProfile,
	getUserAddresses,
	addUserAddress,
	addToCart,
	deleteFromCart,
	resetUserCart,
	getAllOrders,
	
} = require("../controllers/userController")
const auth = require("../middlewares/authMiddleware")
//const admin = require("../middlewares/authMiddleware")

//router.route('/').get(auth, getUsers)
router.post("/register", register)
router.post("/login", login)
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile)
router.route("/shipping").get(auth, getUserAddresses).post(auth, addUserAddress)

router.post("/cart", cart)
router.post("/addToCart", addToCart)
router.post("/deleteFromCart", deleteFromCart)
router.route("/resetCart").post(auth, resetUserCart)
router.route("/getOrders").get(auth, getAllOrders)

module.exports = router
