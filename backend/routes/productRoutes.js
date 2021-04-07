const express = require("express")
const router = express.Router()
const {
	getCategories,
	getSubCategories,
	getProducts,
	getProductDetails,
} = require("../controllers/productController")
const { Category, subCategory } = require("../models/categoryModel")
const Product = require("../models/productModel")

router.get("/categories", getCategories)
router.get("/:category", getSubCategories)
router.get("/:category/:subCategory", getProducts)
router.get("/:category/:subCategory/:id", getProductDetails)

module.exports = router
