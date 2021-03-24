const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isService: {
        type: Boolean,
        required: true
    },
    productSold: [
        {
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            price: {type: Number, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
    serviceBooked: [
        {
            name: {type: String, required: true},
            price: {type: Number, required: true},
            service: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Service'
            },
        }
    ],
    money: {
        type: Number,
        default: 0,
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User;
