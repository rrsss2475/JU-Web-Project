const router = require("express").Router()
const {
	register,
	login,
	cart,
	getUserDetails,
	addToCart,
} = require("../controllers/userController")
const auth = require("../middlewares/authMiddleware")

router.post("/register", register)
router.post("/login", login)
router.route("/profile").get(auth, getUserDetails)
router.post("/cart", cart)
router.post("/addToCart", addToCart)

module.exports = router
