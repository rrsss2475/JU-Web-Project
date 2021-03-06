const express = require("express")
const router = express.Router()
const {
	getCategories,
	getSubCategories,
	getSubCategories1,
	getProducts,
	getProductDetails,
	getProductAdmin,
	getUserName,
	getReviews,
	getProductById,
	getAllProducts,
	deleteProduct,
	createProduct,
	updateProduct,
	canBeRated,
	postRating,
	getProductByQuery
} = require("../controllers/productController")
const { auth, admin } = require("../middlewares/authMiddleware")

router
	.route("/")
	.get(auth, admin, getAllProducts)
	.post(auth, admin, createProduct)
router.get("/search/:query",getProductByQuery)
router.get("/userName/:id", getUserName)
router.get("/categories", getCategories)
router.get("/categories/:id", getProductById)
router
	.route("/admin/:id")
	.delete(auth, admin, deleteProduct)
	.put(auth, admin, updateProduct)
	.get(auth, admin, getProductAdmin)
router.get("/canBeRated/:userid/:id", canBeRated)
router.post("/rate", postRating)
router.get("/byid/:category", getSubCategories1)
router.get("/:category", getSubCategories)
router.get("/:category/:subCategory", getProducts)
router.get("/:category/:subCategory/:id", getProductDetails)
router.get("/:category/:subCategory/:id/reviews", getReviews)

module.exports = router
