const router = require("express").Router()
const {
	register,
	login,
	getUserProfile,
	updateUserProfile,
	getUserAddresses,
	addUserAddress,
} = require("../controllers/userController")
const auth = require("../middlewares/authMiddleware")

router.post("/register", register)
router.post("/login", login)
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile)
router.route("/shipping").get(auth, getUserAddresses).post(auth, addUserAddress)

module.exports = router
