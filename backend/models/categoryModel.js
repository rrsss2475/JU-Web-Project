const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    isService:{
        type: Boolean,
        required: true,
    },
    image:{
        type: String,
        required: true,
    }
})


const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    subCategory: [subCategorySchema],
    isService:{
        type: Boolean,
        required: true,
        default: false,
    },
    image:{
        type: String,
        required: true,
    }
})

const subCategory = mongoose.model('subCategory', subCategorySchema)
const Category = mongoose.model('Category', categorySchema)

module.exports = {
    subCategory: subCategory,
    Category: Category,
}