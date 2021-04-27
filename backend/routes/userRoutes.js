const router = require("express").Router()
const {
	register,
	login,
	cart,
	getUserProfile,
	updateUserProfile,
	getUserAddresses,
	addUserAddress,
	addToCart,
	deleteFromCart,
} = require("../controllers/userController")
const auth = require("../middlewares/authMiddleware")

router.post("/register", register)
router.post("/login", login)
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile)
router.route("/shipping").get(auth, getUserAddresses).post(auth, addUserAddress)

router.post("/cart", cart)
router.post("/addToCart", addToCart)
router.post("/deleteFromCart", deleteFromCart)

module.exports = router
