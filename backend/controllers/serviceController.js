const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Category, subCategory } = require("../models/categoryModel");
const Service = require("../models/serviceModel");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isService: true });
    res.json(categories);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getSubCategories = async (req, res) => {
  try {
    const categoryname = req.params.category;
    const category = await Category.findOne({ name: categoryname });
    res.json(category.subCategory);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getServices = async (req, res) => {
  try {
    const subcategoryname = req.params.subCategory;
    const subcategory = await subCategory.findOne({ name: subcategoryname });
    const services = await Service.find({ subCategory: subcategory._id });
    res.json(services);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getServiceDetails = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.json(service);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  getCategories: getCategories,
  getSubCategories: getSubCategories,
  getServices: getServices,
  getServiceDetails: getServiceDetails,
};
