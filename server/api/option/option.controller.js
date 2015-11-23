/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /options              ->  index
 * POST    /options              ->  create
 * GET     /options/:id          ->  show
 * PUT     /options/:id          ->  update
 * DELETE  /options/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Option = require('./option.model');

// Get list of all options
exports.index = function(req, res) {
    Option.find(function(err, options) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(options);
    });
};


// Creates a new option in the DB.
exports.create = function(optionObj) {
    return findLatestOptionId(function(option) {

        var latestOptionId = option ? option._id : 0;

        var optionId = latestOptionId + 1;

        optionObj._id = optionId;
        return Option.create(optionObj, function(err, option) {
            if (err) {
                return handleError(res, err);
            }
            return option;
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}

function findLatestOptionId(callback) {
    Option.findOne({}, {}, {
        sort: {
            '_id': 'descending'
        }
    }, function(err, option) {
        callback.call(null, option);
    });

}