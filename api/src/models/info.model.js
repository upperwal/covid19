const mongoose = require('mongoose');

const infoSchema = mongoose.Schema({
    verified: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    fraud_report_count: {
        type: Number,
        default: 0
    },
    name: {
        type: String
    },
    date_added: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    poc: [{
            name: {
                type: String
            },
            phone: {
                type: String
            }
    }],
    location: {
        type: {
            type: String,
            enum: ["Point"]
        },
        coordinates: {
            type: [Number]
        }
    },
    address: {
        type: String
    },
    price: {
        type: Number
    },
    price_unit: {
        type: String
    },
    tags: [String],
    comments: {
        type: String
    },
    data_source_url: [String],
    operating_time: [{
        opening: {
            type: String // HH:MM:SS
        },
        closing: {
            type: String // HH:MM:SS
        }
    }]
})

infoSchema.index({ location: '2dsphere' });
infoSchema.index({ tags: 1 });
infoSchema.index({ 'poc.phone': 1 });

/**
 * @typedef Info
 */
const Info = mongoose.model('Info', infoSchema);

module.exports = Info;
