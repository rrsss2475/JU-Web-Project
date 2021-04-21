const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { Category, subCategory } = require("../models/categoryModel");
const Product = require("../models/productModel");
const { User } = require("../models/userModel");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isService: false });
  res.json(categories);
});

const getSubCategories = asyncHandler(async (req, res) => {
  const categoryname = req.params.category;
  const category = await Category.findOne({ name: categoryname });
  const subCategoryList = [];
  for (const subcategory of category.subCategory) {
    const subCategoryFound = await subCategory.findById(subcategory._id);
    subCategoryList.push(subCategoryFound);
  }
  res.json(subCategoryList);
});

const getProducts = asyncHandler(async (req, res) => {
  const subcategoryname = req.params.subCategory;
  const subcategory = await subCategory.findOne({ name: subcategoryname });
  const products = await Product.find({ subCategory: subcategory._id });
  res.json(products);
});

const getProductDetails = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

const getUserName = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ name: user.name });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getReviews = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product.reviews);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  getCategories: getCategories,
  getSubCategories: getSubCategories,
  getProducts: getProducts,
  getProductDetails: getProductDetails,
  getUserName: getUserName,
  getReviews: getReviews,
};
