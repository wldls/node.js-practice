var mongoose = require('mongoose');

var movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    type: {
      type: String,
    },
    grade: {
      type: String,
    },
    actor: {
      type: String,
    }
  },
  { collection: 'movie' }
);

var MovieModel = mongoose.model('movie', movieSchema);

module.exports = MovieModel;
