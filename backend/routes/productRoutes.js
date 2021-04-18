const express = require("express")
const router = express.Router()
const {
	getCategories,
	getSubCategories,
	getProducts,
	getProductDetails,
	getUserName,
	getReviews
} = require("../controllers/productController")
const { Category, subCategory } = require("../models/categoryModel")
const Product = require("../models/productModel")

router.get("/userName/:id", getUserName)
router.get("/categories", getCategories)
router.get("/:category", getSubCategories)
router.get("/:category/:subCategory", getProducts)
router.get("/:category/:subCategory/:id", getProductDetails)
router.get("/:category/:subCategory/:id/reviews", getReviews)
module.exports = router
