const router = require("express").Router()
const {
	register,
	login,
	cart,
	getUserDetails,
} = require("../controllers/userController")
const auth = require("../middlewares/authMiddleware")

router.post("/register", register)
router.post("/login", login)
router.route("/profile").get(auth, getUserDetails)
router.post("/cart", cart)

module.exports = router
