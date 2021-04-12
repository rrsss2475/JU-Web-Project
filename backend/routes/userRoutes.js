// const User = require('../models/userModel.js')
// const users = require('../data/users')

const router = require("express").Router()
const {
	register,
	login,
	getUserDetails,
} = require("../controllers/userController")
const auth = require("../middlewares/authMiddleware")

// router.get("/login",login)
// router.get("/profile",getUserDetails)

// router.get("/seed", async(req, res) => {
// 	const createdUsers = await User.insertMany(users);
// 	res.send({ createdUsers });
// })

router.post("/register", register)
router.post("/login", login)
router.route("/profile").get(auth, getUserDetails)

module.exports = router
