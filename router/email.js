var express = require('express');
var router = express.Router();
var UserModel = require('../userModel.js');

router.post('/form', function(req, res){
	// get: req.param('email')
	// post: bodyParser 사용

	// res.send(`<h1>welcome ! ${req.body.email}</h1>`)
	res.render('email.ejs', {email: req.body.email});
});

router.post('/save', function(req, res){
	// check validation about input value => select db
	// var responseData = {'result': 'ok', 'email': req.body.email}
	var User = new UserModel();

	User.email = req.body.email;
	User.name = req.body.name;
	
	User.save(function(err, user){
		if(err){
			console.log(err);
			res.json({reslut: 0});
			return;
		}
		res.json({result: 1, email: user.email, name: user.name});
	});
});

// router.get('/loadName', function(req, res){	
// 	console.log(req.body.email);
// 	UserModel.findOne({email: req.body.email}, function(err, user){		
//         if(err){
// 			res.json({'result': 0});
// 			return res.status(500).send({error: 'database failure'});
// 		} 
//         if(!user){
// 			res.json({'result': 0});
// 			return res.status(404).json({error: 'book not found'});
// 		}

//         // res.json({'result': 1, 'email': user.email, 'name': user.name});
//         res.json(user);
// 	});	
// });

module.exports = router;