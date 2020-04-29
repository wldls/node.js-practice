var express = require('express');
var router = express.Router();
var JoinModel = require('../joinModel.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/', function(req, res){
	var msg = '';
	var errMsg = req.flash('error');	
	if(errMsg){
		msg = errMsg;
	}
	res.render('login.ejs', {message: msg});
});

passport.serializeUser(function(user, done) {
	done(null, user);
 });
  
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use('local-login', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done){
	JoinModel.findOne({email:email}, function(err, user){
		if(err){ return done(err) }		
		if(!user){
			return done(null, false, {message: 'your email not found'});
		}

		return done(null, user);
	});	
}));

router.post('/', function(req, res, next){
	passport.authenticate('local-login', function(err, user, info){
		if(err) res.status(500).json(err);
		if(!user){ return res.status(401).json(info.message); }

		req.logIn(user, function(err){
			if(err){return next(err)}
			return res.json(user);
		});
	})(req, res, next);
});

module.exports = router;