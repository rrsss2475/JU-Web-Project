const express = require("express");
const router = express.Router();
const {
  getCategories,
  getSubCategories,
  getServices,
  getServiceDetails,
  getUserName,
  getReviews,
  canBeRated,
  postRating
} = require("../controllers/serviceController");
const { Category, subCategory } = require("../models/categoryModel");
const Service = require("../models/serviceModel");

router.get("/userName/:id", getUserName);
router.get("/categories", getCategories);
router.get("/canBeRated/:userid/:id", canBeRated)
router.post("/rate", postRating)
router.get("/:category", getSubCategories);
router.get("/:category/:subCategory", getServices);
router.get("/:category/:subCategory/:id", getServiceDetails);
router.get("/:category/:subCategory/:id/reviews", getReviews);

module.exports = router;
