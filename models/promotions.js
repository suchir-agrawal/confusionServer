const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)

const Schema = mongoose.Schema  
const Currency = mongoose.Types.Currency


const promoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

var promotions = mongoose.model("Promotion",promoSchema)

module.exports = promotions