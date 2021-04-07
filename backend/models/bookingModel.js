const mongoose = require("mongoose")
const Address = require("userModel")

const bookingSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		bookingItem: {
			name: { type: String, required: true },
			image: { type: String, required: true },
			price: { type: Number, required: true },
			service: {
				type: mongoose.Schema.Types.ObjectId,
				required: true,
				ref: "Service",
			},
		},
		shippingAddress: Address,
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		toBeCompleted: {
			type: Date,
		},
		isCompleted: {
			type: Boolean,
			reuired: true,
			default: false,
		},
		completedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
)

const Booking = mongoose.model("Booking", bookingSchema)

module.exports = Booking
