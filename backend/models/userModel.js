const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    zip:{
        type: Number,
        required: true,
    },
    lastUsed:{
        type: Date
    },
})

const userSchema = mongoose.Schema({
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
    address: [addressSchema],
    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)
const Address = mongoose.model('Address', addressSchema)
module.exports = {
    User: User,
    Address: Address,
}