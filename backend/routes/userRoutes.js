const router = require("express").Router()
const {
	register,
	login,
	getUserProfile,
	updateUserProfile,
} = require("../controllers/userController")
const auth = require("../middlewares/authMiddleware")

router.post("/register", register)
router.post("/login", login)
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile)

module.exports = router
