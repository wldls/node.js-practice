var express = require('express');
var router = express.Router();
var MovieModel = require('../MovieModel.js');

router.get('/list', function(req, res){
	res.render('movie.ejs');
});

// 1. /movie, GET
router.get('/', function(req, res){
	var resData = {};

	MovieModel.find(function(err, movie){
		if(err) return res.status(500).send({error: 'database failure'});		
		if(movie.length){
			resData.result = 1;
			resData.data = movie;
		}else{
			resData.result = 0;
		}
		res.json(resData);
	});
});

// 2. /movie, POST
router.post('/', function(req, res){
	var Movie = new MovieModel();
	
	Movie.title = req.body.title;
	Movie.type = req.body.type;
	Movie.grade = req.body.grade;
	Movie.actor = req.body.actor;
	
	Movie.save(function(err, user){
		if(err) throw err;
		return res.json({'result': 1});
	});
});

// 3. /movie/:title, GET
router.get('/:title', function(req, res){
	var title = req.params.title;
	var resData = {};

	MovieModel.find({title: title}, function(err, movie){
		if(err) return res.status(500).send({error: 'database failure'});		
		if(movie.length){
			resData.result = 1;
			resData.data = movie;
		}else{
			resData.result = 0;
		}
		res.json(resData);
	});
});

// 4. /movie/:title, DELETE
router.delete('/:title', function(req, res){
	var title = req.params.title;
	var resData = {};

	MovieModel.remove({title: title}, function(err, output){
		if(err) return res.status(500).send({error: 'database failure'});

		if(output.n){
			resData.result = 1;
			resData.data = title;
		}else{
			resData.result = 0;
		}
		res.json(resData);
	});
});

// 4. /movie/:title, PUT
router.put('/:title', function(req, res){
	var title = req.params.title;
	console.log(req.body.type);
	var set = {type: req.body.type, grade: req.body.grade, actor: req.body.actor};
	var resData = {};

	MovieModel.update({title: title}, set,function(err, output){
		if(err) return res.status(500).send({error: 'database failure'});
		console.log(output);
		if(output.n){
			resData.result = 1;
			resData.data = title;
		}else{
			resData.result = 0;
		}
		res.json(resData);
	});
});

module.exports = router;