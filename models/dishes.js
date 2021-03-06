const mongoose = require("mongoose")

require('mongoose-currency').loadType(mongoose)
const Schema = mongoose.Schema;
const Currency = mongoose.Types.Currency

const commentSchema = new Schema({
    rating: {
        type: Number,
        min:1,
        max:5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

const dishSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ""
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    Featured: {
        type: Boolean,
        default: false
    },
    comments: [ commentSchema ]
},
{
    timestamps: true
});

var dishes = mongoose.model("Dish", dishSchema);

module.exports = dishes;