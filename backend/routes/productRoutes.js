const express = require("express")
const router = express.Router()
const {
	getCategories,
	getSubCategories,
	getProducts,
	getProductDetails,
	getProductAdmin,
	getUserName,
	getReviews,
	getProductById,
	getAllProducts,
	deleteProduct,
	createProduct,
	updateProduct
} = require("../controllers/productController")
const { auth , admin }  = require("../middlewares/authMiddleware")

router.route("/").get(auth, admin, getAllProducts).post(auth, admin, createProduct)
router.get("/userName/:id", getUserName)
router.get("/categories", getCategories)
router.get("/categories/:id", getProductById)
router.route("/admin/:id")
.delete(auth, admin, deleteProduct)
.put(auth, admin, updateProduct)
.get(auth,admin, getProductAdmin)
router.get("/:category", getSubCategories)
router.get("/:category/:subCategory", getProducts)
router.get("/:category/:subCategory/:id", getProductDetails)
router.get("/:category/:subCategory/:id/reviews", getReviews)

module.exports = router
