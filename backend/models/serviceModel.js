const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true},
    rating: { type: String, required: true},
    comment: { type: String, required: true},
}, {
    timestamps: true
})


const serviceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'subCategory',
    },
    description: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service;
