const express = require("express")
const asyncHandler = require("express-async-handler")
const router = express.Router()
const { Category, subCategory } = require("../models/categoryModel")
const Service = require("../models/serviceModel")

const getCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find({ isService: true })
	res.json(categories)
})

const getSubCategories = asyncHandler(async (req, res) => {
	const categoryname = req.params.category
	const category = await Category.findOne({ name: categoryname })
	res.json(category.subCategory)
})

const getServices = asyncHandler(async (req, res) => {
	const subcategoryname = req.params.subCategory
	const subcategory = await subCategory.findOne({ name: subcategoryname })
	const services = await Service.find({ subCategory: subcategory._id })
	res.json(services)
})

const getServiceDetails = asyncHandler(async (req, res) => {
	const service = await Service.findById(req.params.id)
	res.json(service)
})

module.exports = {
	getCategories: getCategories,
	getSubCategories: getSubCategories,
	getServices: getServices,
	getServiceDetails: getServiceDetails,
}