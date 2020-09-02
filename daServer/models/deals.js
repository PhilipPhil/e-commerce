const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Float = require('mongoose-float').loadType(mongoose);

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
        default: ""
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
        type: Float,
        default: 0
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Deals = mongoose.model('Deal', dealSchema);

module.exports = Deals;