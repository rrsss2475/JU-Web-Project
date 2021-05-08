const express = require("express");
const router = express.Router();
const {
  getCategories,
  getSubCategories,
  getServices,
  getServiceDetails,
  getUserName,
  getReviews
} = require("../controllers/serviceController");
const { Category, subCategory } = require("../models/categoryModel");
const Service = require("../models/serviceModel");

router.get("/userName/:id", getUserName);
router.get("/categories", getCategories);
router.get("/:category", getSubCategories);
router.get("/:category/:subCategory", getServices);
router.get("/:category/:subCategory/:id", getServiceDetails);
router.get("/:category/:subCategory/:id/reviews", getReviews);

module.exports = router;
