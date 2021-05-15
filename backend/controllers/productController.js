const express = require('express')
const asyncHandler = require('express-async-handler')
const router = express.Router()
const { Category, subCategory } = require('../models/categoryModel')
const Product = require('../models/productModel')
const { User } = require('../models/userModel')

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

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
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
  res.json(product)
})

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
    .populate({ path: 'category', select: 'name' })
    .populate({ path: 'subCategory', select: 'name' })
  res.json(products)
})

const createProduct = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isService: false })

  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    category: categories[0]._id,
    subCategory: categories[0].subCategory[0]._id,
    isAvailable: true,
    numReviews: 0,
    description: 'Sample description',
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
  } = req.body

  const product = await Product.findById(req.params.id);

  if(product)
  {
	product.name = name
	product.price = price
	product.image = image
	product.isAvailable =isAvailable
	product.numReviews = numReviews
	product.description =description
	product.isWeighted = isWeighted

	const updatedProduct = await product.save()
  	res.json(updatedProduct)
  }
  else{
	  res.status(404)
	  throw new Error('Product not found') 
  }

})

const getProductAdmin = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if(product)
  res.json(product);
  else{
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  getCategories: getCategories,
  getSubCategories: getSubCategories,
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
}
