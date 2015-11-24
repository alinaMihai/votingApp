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
        getAllPollOptions(option.poll).then(function(options) {
            var newVoter = checkUniqueVoter(options, userEmail);
            if (!newVoter) {
                return res.status(400).send('You cannot take poll twice')
            }
            option.vots = option.vots ? option.vots + 1 : 1;
            option.voters.push(userEmail);
            addUserPoll(userEmail, option.poll);
            option.save(function(err) {
                if (err) {
                    return handleError(res, err);
                }
                return res.status(200).send('No Content');
            });
        });

    });
};

function handleError(res, err) {
    console.log(err);
    return res.status(500).send(err);
}

function getAllPollOptions(pollId) {
    var voters = [];
    var query = Option.find({});
    query.where('poll', pollId);
    return query.exec(function(err, options) {});
}

function checkUniqueVoter(options, userEmail) {
    var isPresent;
    for (var i = 0; i < options.length; i++) {
        if (options[i].voters.indexOf(userEmail) !== -1) {
            isPresent = true;
            break;
        }
    };
    return isPresent ? false : true;
}

function addUserPoll(userEmail, pollId) {
    User.update({
        'email': userEmail
    }, {
        $addToSet: {
            'polls': pollId
        }
    }).exec();
}