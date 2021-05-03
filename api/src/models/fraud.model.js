const mongoose = require('mongoose');
const validator = require('validator');

const fraudSchema = mongoose.Schema({
    phone: {
        type: String
    },
    upi: {
        type: String,
    },
    account_number: {
        type: String,
    },
    comment: {
        type: String
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    entity_name: {
        type: String
    },
    region: {
        name: {
            type: String
        },
        location: {
            type: {
                type: String,
                enum: ["Point"]
            },
            coordinates: {
                type: [Number]
            }
        },
    },
    reported_by: {
        phone: String,
        email: {
            type: String,
            trim: true,
            lowercase: true
        },
    },
    is_reported_by_credible_source: {
        type: Boolean,
        default: false
    }
})

/**
 * @typedef Fraud
 */
const Fraud = mongoose.model('Fraud', fraudSchema);

module.exports = Fraud;
