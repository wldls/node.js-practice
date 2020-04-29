var express = require('express');
var router = express.Router();
var MovieModel = require('../MovieModel.js');

router.get('/list', function(req, res){
	res.render('movie.ejs');
});

// 1. /movie, GET
router.get('/', function(req, res){
	res.render('movie.ejs');
});

module.exports = router;