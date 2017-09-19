'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var userSchema = new Schema({
  name: {
    type: String,
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', userSchema);