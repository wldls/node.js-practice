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
      required: true,
    }
  }
);

var UserModel = mongoose.model('useremails', userSchema);

module.exports = UserModel;
