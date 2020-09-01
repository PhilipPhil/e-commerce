const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var emailformSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var Emailform = mongoose.model('Emailform', emailformSchema);

module.exports = Emailform;