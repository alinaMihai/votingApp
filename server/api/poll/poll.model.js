'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
    _id: Number,
    user: String,
    description: String,
    options: [{
        type: Schema.Types.ObjectId,
        ref: 'Option'
    }],
    createDate: Date
});

module.exports = mongoose.model('Poll', PollSchema);