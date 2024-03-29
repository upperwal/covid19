const httpStatus = require('http-status');
const { Info, Update, Fraud } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Insert Info
 * @param {Object} infoBody
 * @returns {Promise<Info>}
 */
const addInfo = async (infoBody) => {
    const info = await Info.create(infoBody);
    return info;
};

/**
 * Find Info
 * @param {Object} infoBody
 * @returns {Promise<Info>}
 */
const findInfo = async (infoBody) => {
    // const info = await Info.find({
    //     'tags': infoBody.tags,
    //     'location': {
    //         '$near': {
    //             '$geometry': infoBody.location,
    //             '$maxDistance': infoBody.max_distance
    //         }
    //     }
    // });

    const info = await Info.aggregate([
        {
            '$geoNear': {
                near: infoBody.location,
                maxDistance: infoBody.max_distance,
                distanceField: 'distance',
                query: {
                    'tags': infoBody.tags
                }
            }
        }, {
            '$lookup': {
                from: 'updates',
                localField: '_id',
                foreignField: 'key',
                as: 'updates'
            }
        }, {
            '$unwind': {
                'path': '$updates',
                'preserveNullAndEmptyArrays': true
            }
        }, {
            '$match': {
                '$or': [
                    {
                        'updates.tag': infoBody.tags
                    },
                    {
                        'updates.tag': null
                    }
                ]
            }
        }, {
            '$group': {
                '_id': '$_id',
                'agg': {
                    '$last': "$$ROOT"
                }
            }
        }, {
            "$replaceRoot": {
                "newRoot":"$agg"
            }
        }
    ]);
    return info;
};

/**
 * Add Update
 * @param {Object} updateBody
 * @returns {Promise<Update>}
 */
const addUpdate = async (updateBody) => {
    const update = await Update.create(updateBody);
    return update;
};

/**
 * Add Fraud case
 * @param {Object} fraudBody
 * @returns {Promise<Fraud>}
 */
const addFraud = async (fraudBody) => {
    const fraud = await Fraud.create(fraudBody);
    return fraud;
};

/**
 * Add Fraud case
 * @param {Object} fraudBody
 * @returns {Promise<Fraud>}
 */
const findFraud = async (fraudBody) => {
    let pipeline = {}
    if(fraudBody.search !== undefined) {
        pipeline = {
            '$or': [
                {
                    'phone': new RegExp(fraudBody.search)
                },
                {
                    'upi': new RegExp(fraudBody.search)
                },
                {
                    'account_number': new RegExp(fraudBody.search)
                }
            ]
        }
    } else {
        pipeline = {
            '$or': [
                {
                    'phone': new RegExp(fraudBody.phone)
                },
                {
                    'upi': new RegExp(fraudBody.upi)
                },
                {
                    'account_number': new RegExp(fraudBody.account_number)
                }
            ]
        }
    }

    const fraud = await Fraud.find(pipeline).select('-reported_by');
    return fraud;
    
};

/**
 * Get Stats
 * @param {Object} fraudBody
 * @returns {Promise<Fraud>}
 */
const getStats = async (fraudBody) => {
    let fraud = await Fraud.aggregate([
        {
            '$group': {
                _id: {
                    phone: '$phone'
                }
            }
        },{
            '$count': 'phone'
        }
    ]);
    let phone = fraud[0].phone

    fraud = await Fraud.aggregate([
        {
            '$group': {
                _id: {
                    upi: '$upi'
                }
            }
        },{
            '$count': 'upi'
        }
    ]);
    let upi = fraud[0].upi

    fraud = await Fraud.aggregate([
        {
            '$group': {
                _id: {
                    account: '$account_number'
                }
            }
        },{
            '$count': 'account'
        }
    ]);
    let account = fraud[0].account

    let count = await Fraud.count({});
    
    return new Promise((resolve, reject) => {
        resolve({
            phone: phone,
            upi: upi,
            account: account,
            count: count
        })
    })
};

/**
 * Get count of reported fraud cases
 * @param {Object} fraudBody
 * @returns {Promise<Custom>}
 */
const findFraudCount = async (fraudBody) => {
    if(fraudBody.search === undefined || fraudBody.search === '') {
        return {
            fraud_report_count: 0,
            view_url: 'https://cov.social/#/scam/'
        }
    }
    let pipeline = {
        '$or': [
            {
                'phone': new RegExp(fraudBody.search)
            },
            {
                'upi': new RegExp(fraudBody.search)
            },
            {
                'account_number': new RegExp(fraudBody.search)
            }
        ]
    }

    const fraud = await Fraud.find(pipeline).count();
    return {
        fraud_report_count: fraud,
        view_url: 'https://cov.social/#/scam/q/' + fraudBody.search
    };
};



module.exports = {
  addInfo,
  findInfo,
  addUpdate,
  addFraud,
  findFraud,
  getStats,
  findFraudCount,
};
