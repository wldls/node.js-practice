var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    actor: {
      type: String,
      required: true,
    }
  }
);

var MovieModel = mongoose.model('movie', movieSchema);

module.exports = MovieModel;
