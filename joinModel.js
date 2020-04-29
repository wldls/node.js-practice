var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 50,
    },
    name: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    }
  }
);

var JoinModel = mongoose.model('join', userSchema);

module.exports = JoinModel;
