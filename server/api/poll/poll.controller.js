/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /polls              ->  index
 * POST    /polls              ->  create
 * GET     /polls/:id          ->  show
 * PUT     /polls/:id          ->  update
 * DELETE  /polls/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');
var Option = require('../option/option.model');

// Get list of all polls
exports.index = function(req, res) {
    Poll.find(function(err, polls) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(polls);
    });
};

// Get a single poll
exports.show = function(req, res) {
    var query = Poll.findOne({});
    query.where('_id', req.params.id);
    query.populate('options');
    query.exec(function(err, poll) {
        if (err) {
            return handleError(res, err);
        }
        if (!poll) {
            return res.status(404).send('Not Found');
        }
        return res.json(poll);
    });

};

//get list of user polls
exports.getUserPolls = function(req, res) {
    var userEmail = req.user.email;
    var query = Poll.find({});
    query.where('user', userEmail);

    query.exec(function(err, polls) {
        if (err) {
            return handleError(res, err);
        }
        return res.status(200).json(polls);
    });
}


// Creates a new poll in the DB.
exports.create = function(req, res) {

    var userEmail = req.user.email;
    req.body.user = userEmail;

    findLatestPollId(function(poll) {
        var pollId = poll ? poll._id : 0;
        var nextPollId = pollId + 1;
        req.body._id = nextPollId;
        var options = req.body.options.map(function(option) {
            option.poll = nextPollId;
            return option;
        });
        req.body.options = [];

        Poll.create(req.body, function(err, poll) {
            if (err) {
                return handleError(res, err);
            }
            //add the options
            addOptions(options, poll);
            return res.status(201).json(poll);
        });
    });
};
// Deletes a poll from the DB.
exports.destroy = function(req, res) {
    Poll.findById(req.params.id, function(err, poll) {
        if (err) {
            return handleError(res, err);
        }
        if (!poll) {
            return res.status(404).send('Not Found');
        }
        poll.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    console.log(err);
    return res.status(500).send(err);
}

function findLatestPollId(callback) {
    Poll.findOne({}, {}, {
        sort: {
            '_id': 'descending'
        }
    }, function(err, option) {
        callback.call(null, option);
    });

}

function addOptions(options, poll) {
    Option.collection.insert(options, function(err, docs) {
        if (err) {
            console.log(err);
        } else {

            for (var i = 0; i < docs.ops.length; i++) {
                poll.options.push(docs.ops[i]._id);
            }
            poll.save(function(err) {
                if (err) {
                    return handleError(res, err);
                }
                console.log(poll);
            });
        }
    });
}