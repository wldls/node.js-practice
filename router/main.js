var express = require('express');
var router = express.Router();
var path = require('path');

// main page는 로그인이 될 때만(세션정보가 있을 때만) 접근이 가능하게 
router.get('/', function(req, res){
	if(!req.user){
		res.redirect('/login');
	}else{
		res.render('main.ejs', {'email': req.user.email});
	}
});

module.exports = router;