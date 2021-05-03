const mongoose = require('mongoose');

const updateSchema = mongoose.Schema({
    date_updated: {
        type: Date,
        default: Date.now
    },
    key: {
        type: mongoose.ObjectId
    },
    tag: {
        type: String
    },
    stock_availability: {
        type: Number,
        default: -1 // -1: Stock info not available, 0: No stock, >0: In stock
    },
    next_restock_date: {
        type: Date
    }
})

updateSchema.index({ phone: 1 });

/**
 * @typedef Update
 */
const Update = mongoose.model('Update', updateSchema);

module.exports = Update;
