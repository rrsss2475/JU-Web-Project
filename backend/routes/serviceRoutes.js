const express = require("express");
const router = express.Router();
const { auth, admin } = require("../middlewares/authMiddleware")
const {
  getCategories,
  getSubCategories,
  getServices,
  getServiceDetails,
  getUserName,
  getReviews,
  canBeRated,
  postRating,
  getAllServices,
  createService,
  getServiceById,
  deleteService,
  updateService,
  getServiceAdmin,
  getSubCategories1
} = require("../controllers/serviceController");
const { Category, subCategory } = require("../models/categoryModel");
const Service = require("../models/serviceModel");

router
  .route("/")
  .get(auth, admin, getAllServices)
  .post(auth, admin, createService)
router.get("/userName/:id", getUserName);
router.get("/categories", getCategories);
router.get("/categories/:id", getServiceById)
router
	.route("/admin/:id")
	.delete(auth, admin, deleteService)
	.put(auth, admin, updateService)
	.get(auth, admin, getServiceAdmin)
router.get("/canBeRated/:userid/:id", canBeRated)
router.post("/rate", postRating)
router.get("/byid/:category", getSubCategories1)
router.get("/:category", getSubCategories);
router.get("/:category/:subCategory", getServices);
router.get("/:category/:subCategory/:id", getServiceDetails);
router.get("/:category/:subCategory/:id/reviews", getReviews);

module.exports = router;
