const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    deal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deal'
    }
}, {
    timestamps: true
});

var Reviews = mongoose.model('Review', reviewSchema);

module.exports = Reviews;