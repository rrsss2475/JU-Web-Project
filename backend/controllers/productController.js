const express = require("express")
const router = express.Router()
const _ = require("lodash")
const { Category, subCategory } = require("../models/categoryModel")
const Product = require("../models/productModel")
const { User } = require("../models/userModel")

const getCategories = async (req, res) => {
	try {
		const categories = await Category.find({ isService: false })
		res.json(categories)
	} catch (err) {
		res.status(400).send(err)
	}
}

const getSubCategories = async (req, res) => {
	try {
		const categoryname = req.params.category
		const category = await Category.findOne({ name: categoryname })
		res.json(category.subCategory)
	} catch (err) {
		res.status(400).send(err)
	}
}

const getProducts = async (req, res) => {
	try {
		const subcategoryname = req.params.subCategory
		const subcategory = await subCategory.findOne({ name: subcategoryname })
		const products = await Product.find({ subCategory: subcategory._id })
		res.json(products)
	} catch (err) {
		res.status(400).send(err)
	}
}

const getProductDetails = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id)
		res.json(product)
	} catch (err) {
		res.status(400).send(err)
	}
}

const getUserName = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		res.json({ name: user.name });
	} catch (err) {
		res.status(400).send(err);
	}
}

const getReviews = async (req,res) => {
	try {
		const product = await Product.findById(req.params.id)
		res.json(product.reviews)
	} catch(err)  {
		res.status(400).send(err);
	}
}

module.exports = {
	getCategories: getCategories,
	getSubCategories: getSubCategories,
	getProducts: getProducts,
	getProductDetails: getProductDetails,
	getUserName: getUserName,
	getReviews: getReviews
}
