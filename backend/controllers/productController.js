const express = require("express")
const asyncHandler = require("express-async-handler")
const router = express.Router()
const { Category, subCategory } = require("../models/categoryModel")
const Product = require("../models/productModel")

const getCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find({ isService: false })
	res.json(categories)
})

const getSubCategories = asyncHandler(async (req, res) => {
	const categoryname = req.params.category
	const category = await Category.findOne({ name: categoryname })
	res.json(category.subCategory)
})

const getProducts = asyncHandler(async (req, res) => {
	const subcategoryname = req.params.subCategory
	const subcategory = await subCategory.findOne({ name: subcategoryname })
	const products = await Product.find({ subCategory: subcategory._id })
	res.json(products)
})

const getProductDetails = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	res.json(product)
})

module.exports = {
	getCategories: getCategories,
	getSubCategories: getSubCategories,
	getProducts: getProducts,
	getProductDetails: getProductDetails,
}
