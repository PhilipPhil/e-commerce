const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deal'        
    }]
}, {
    timestamps: true
})

let Favorites = mongoose.model('favorite', favoriteSchema);

module.exports = Favorites;