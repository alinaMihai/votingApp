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
var User = require('../user/user.model');
exports.registerPoll = function(req, res) {
    var userEmail = req.user.email;

    var query = Option.findOne({});
    query.where('_id', req.params.id);
    query.exec(function(err, option) {
        if (err) {
            return handleError(res, err);
        }
        var newVoter = checkUniqueVoter(userEmail, option.voters);
        if (!newVoter) {
            return res.status(404).send('You cannot vote this poll more than once');
        }
        option.vots = option.vots ? option.vots + 1 : 1;
        option.voters.push(userEmail);
        option.save(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(200).send('No Content');
        });

    });
};

function handleError(res, err) {
    console.log(err);
    return res.status(500).send(err);
}

function checkUniqueVoter(userEmail, voters) {
    var isPresent = false;

    for (var i = 0; i < voters.length; i++) {
        if (voters[i] === userEmail) {
            isPresent = true;
            break;
        }
    }
    return isPresent ? false : true;
}