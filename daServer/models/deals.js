const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

var reviewSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        default: '',
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

const dealSchema = new Schema({
    company: {
        type: String,
        required: true
    },
    mainimage: {
        type: String,
        required: true
    },
    logoimage: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fineprint: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    categoriesOne: {
        type: String,
        required: true
    },
    categoriesTwo: {
        type: String,
    },
    categoriesThree: {
        type: String,
    },
    reviews: [reviewSchema]
}, {
    timestamps: true
});

var Deals = mongoose.model('Deal', dealSchema);

module.exports = Deals;