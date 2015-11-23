'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var OptionSchema = new Schema({
    poll: {
        type: Number,
        ref: 'Poll'
    },
    text: String,
    vots: Number,
    voters: [{
        type: String
    }]
});

module.exports = mongoose.model('Option', OptionSchema);