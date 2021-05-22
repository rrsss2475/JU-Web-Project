const express = require("express")
const asyncHandler = require("express-async-handler")
const router = express.Router()
const { Category, subCategory } = require("../models/categoryModel")
const Service = require("../models/serviceModel")
const { User } = require("../models/userModel")

const getCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find({ isService: true })
	res.json(categories)
})

const getSubCategories = asyncHandler(async (req, res) => {
	const categoryname = req.params.category
	const category = await Category.findOne({ name: categoryname })
	const subCategoryList = []
	for (const subcategory of category.subCategory) {
		const subCategoryFound = await subCategory.findById(subcategory._id)
		subCategoryList.push(subCategoryFound)
	}
	res.json(subCategoryList)
})

const getSubCategories1 = asyncHandler(async (req, res) => {
	const categoryid = req.params.category
	const category = await Category.findById(categoryid)
	const subCategoryList = []
	for (const subcategory of category.subCategory) {
		const subCategoryFound = await subCategory.findById(subcategory._id)
		subCategoryList.push(subCategoryFound)
	}
	res.json(subCategoryList)
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


const getUserName = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		res.json({ name: user.name })
	} catch (err) {
		res.status(400).send(err)
	}
}

const getReviews = async (req, res) => {
	try {
		const service = await Service.findById(req.params.id)
		res.json(service.reviews)
	} catch (err) {
		res.status(400).send(err)
	}
}

const canBeRated = async (req, res) => {
	const user = await User.findById(req.params.userid)
	res.json(
		user.orderedProducts.find((x) => {
			return JSON.stringify(x.product) == JSON.stringify(req.params.id)
		})
	)
}

const postRating = async (req, res) => {
	const rating = Number(req.body.rating)
	if (rating == 0) return res.status(400).json("Rating cannot be zero!")
	await Service.findOneAndUpdate(
		{ _id: req.body.id },
		{ $pull: { reviews: { email: req.body.email } } }
	)
	const product = await Service.findById(req.body.id)
	product.reviews.push({
		email: req.body.email,
		rating: req.body.rating,
		comment: req.body.comment,
	})
	product.numReviews = product.reviews.length
	let sumRatings = 0
	for (let item of product.reviews) {
		sumRatings += Number(item.rating)
	}
	product.rating = sumRatings / product.numReviews
	await product.save()
	res.json("Updated!")
}

const getAllServices = asyncHandler(async (req, res) => {
	const services = await Service.find({})
		.populate({ path: "category", select: "name" })
		.populate({ path: "subCategory", select: "name" })
	res.json(services)
})

const createService = asyncHandler(async (req, res) => {
	const categories = await Category.find({ isService: true })

	const service = new Service({
		name: "Sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		category: categories[0]._id,
		subCategory: categories[0].subCategory[0]._id,
		isAvailable: true,
		numReviews: 0,
		description: "Sample description",
	})

	const createdService = await service.save()
	res.status(201).json(createdService)
})

const getServiceById = asyncHandler(async (req, res) => {
	const service = await Service.findById(req.params.id)
		.populate({ path: "category", select: "name" })
		.populate({ path: "subCategory", select: "name" })
	res.json(service)
})

const updateService = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		image,
		isAvailable,
		numReviews,
		description,
		category,
		subCategory
	} = req.body

	const service = await Service.findById(req.params.id)

	if (service) {
		service.name = name
		service.price = price
		service.image = image
		service.isAvailable = isAvailable
		service.numReviews = numReviews
		service.description = description
		service.category = category
		service.subCategory = subCategory

		const updatedService = await service.save()
		res.json(updatedService)
	} else {
		res.status(404)
		throw new Error("Service not found")
	}
})

const deleteService = asyncHandler(async (req, res) => {
	const service = await Service.findById(req.params.id)
	if (service) {
		await service.remove()
		res.json({ message: "Service removed" })
	} else {
		res.status(404)
		throw new Error("Service not found")
	}
})

const getServiceAdmin = asyncHandler(async (req, res) => {
	const service = await Service.findById(req.params.id)
	if (service) res.json(service)
	else {
		res.status(404)
		throw new Error("User not found")
	}
})

module.exports = {
	getCategories: getCategories,
	getSubCategories: getSubCategories,
	getServices: getServices,
	getServiceDetails: getServiceDetails,
	getUserName: getUserName,
	getReviews: getReviews,
	canBeRated: canBeRated,
	postRating: postRating,
	getAllServices: getAllServices,
	createService: createService,
	getServiceById: getServiceById,
	updateService: updateService,
	deleteService: deleteService,
	getServiceAdmin: getServiceAdmin,
	getSubCategories1: getSubCategories1
}
