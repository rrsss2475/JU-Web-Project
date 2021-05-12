const express = require("express")
const router = express.Router()
const {
	getCategories,
	getSubCategories,
	getProducts,
	getProductDetails,
	getUserName,
	getReviews,
	getProductById,
	canBeRated,
	postRating,
} = require("../controllers/productController")

router.get("/userName/:id", getUserName)
router.get("/categories", getCategories)
router.get("/categories/:id", getProductById)
router.get("/canBeRated/:userid/:id", canBeRated)
router.post("/rate", postRating)
router.get("/:category", getSubCategories)
router.get("/:category/:subCategory", getProducts)
router.get("/:category/:subCategory/:id", getProductDetails)
router.get("/:category/:subCategory/:id/reviews", getReviews)

module.exports = router
