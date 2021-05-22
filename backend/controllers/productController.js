const express = require("express")
const asyncHandler = require("express-async-handler")
const router = express.Router()
const { Category, subCategory } = require("../models/categoryModel")
const Product = require("../models/productModel")
const Service = require("../models/serviceModel")
const { User } = require("../models/userModel")

const getCategories = asyncHandler(async (req, res) => {
	const categories = await Category.find({ isService: false })
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
		const product = await Product.findById(req.params.id)
		res.json(product.reviews)
	} catch (err) {
		res.status(400).send(err)
	}
}

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
		.populate({ path: "category", select: "name" })
		.populate({ path: "subCategory", select: "name" })
	res.json(product)
})

const isEqual = (str, map) => {
	const strWords = str.split(" ");
	for (word of strWords) {
		if (map[word.toLowerCase()] === 1)
			return true;
	}
	return false;
}

const getProductByQuery = async (req, res) => {
	try {
		let products = await Product.find({})
			.populate({ path: "category", select: "name" })
			.populate({ path: "subCategory", select: "name" })
		let services = await Service.find({})
			.populate({ path: "category", select: "name" })
			.populate({ path: "subCategory", select: "name" })
		products=products.concat(services)
		const query = req.params.query;
		const queryWords = query.split(" ");
		var map = {};
		for (word of queryWords) {
			map[word.toLowerCase()] = 1;
		}
		if (queryWords.length == 1 && map["all"] == 1)
			return res.json(products)
		const result = products.filter((x) => {
			return isEqual(x.name, map) || isEqual(x.category.name, map) || isEqual(x.subCategory.name, map);
		})
		res.json(result);
	} catch (err) {
		res.status(400).send(err);
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


const postRating = asyncHandler(async (req, res) => {
	const rating = Number(req.body.rating)
	if (rating == 0) return res.status(400).json("Rating cannot be zero!")
	await Product.findOneAndUpdate(
		{ _id: req.body.id },
		{ $pull: { reviews: { email: req.body.email } } }
	)
	const product = await Product.findById(req.body.id)
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
})

const getAllProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({})
		.populate({ path: "category", select: "name" })
		.populate({ path: "subCategory", select: "name" })
	res.json(products)
})

const createProduct = asyncHandler(async (req, res) => {
	const categories = await Category.find({ isService: false })

	const product = new Product({
		name: "Sample name",
		price: 0,
		user: req.user._id,
		image: "/images/sample.jpg",
		category: categories[0]._id,
		subCategory: categories[0].subCategory[0]._id,
		isAvailable: true,
		numReviews: 0,
		description: "Sample description",
		isWeighted: false,
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
	const {
		name,
		price,
		image,
		isAvailable,
		numReviews,
		description,
		isWeighted,
		category,
		subCategory,
		weights
	} = req.body

	const product = await Product.findById(req.params.id)

	if (product) {
		product.name = name
		product.price = price
		product.image = image
		product.isAvailable = isAvailable
		product.numReviews = numReviews
		product.description = description
		product.isWeighted = isWeighted
		if(isWeighted)
		product.weights=weights
		product.category = category
		product.subCategory = subCategory

		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} else {
		res.status(404)
		throw new Error("Product not found")
	}
})

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) {
		await product.remove()
		res.json({ message: "Product removed" })
	} else {
		res.status(404)
		throw new Error("Product not found")
	}
})

const getProductAdmin = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	if (product) res.json(product)
	else {
		res.status(404)
		throw new Error("User not found")
	}
})

module.exports = {
	getCategories: getCategories,
	getSubCategories: getSubCategories,
	getSubCategories1: getSubCategories1,
	getProducts: getProducts,
	getProductDetails: getProductDetails,
	getProductById: getProductById,
	getAllProducts: getAllProducts,
	getProductAdmin: getProductAdmin,
	deleteProduct: deleteProduct,
	createProduct: createProduct,
	updateProduct: updateProduct,
	getUserName: getUserName,
	getReviews: getReviews,
	canBeRated: canBeRated,
	postRating: postRating,
	getProductByQuery: getProductByQuery
}
