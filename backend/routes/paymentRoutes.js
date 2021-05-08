const express = require("express")
const auth = require("../middlewares/authMiddleware")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const { v4: uuidv4 } = require("uuid")
const asyncHandler = require("express-async-handler")
const router = express.Router()

router.post(
	"/",
	asyncHandler(async (req, res) => {
		const { order, token } = req.body
		const idempotencyKey = uuidv4()

		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		})

		if (customer) {
			const charge = await stripe.charges.create(
				{
					amount: order.totalPrice * 100,
					currency: "inr",
					customer: customer.id,
				},
				{ idempotencyKey }
			)
			return res.status(200).json(charge)
		} else {
			res.status(404)
			throw new Error("Failed")
		}
	})
)

module.exports = router
