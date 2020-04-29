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
	res.render('join.ejs', {message: msg});
});

passport.serializeUser(function(user, done) {
	done(null, user);
 });
  
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use('local-join', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done){
	JoinModel.findOne({email:email}, function(err, user){
		if(err){ return done(err) }		
		if(user){
			return done(null, false, {message: 'your email is already used'});
		}else{
			var Join = new JoinModel();
		
			Join.email = email;
			Join.password = password;
			
			Join.save(function(err, user){
				if(err) throw err;
				return done(null, user);
			});
		}
	});	
}));

router.post('/',
	passport.authenticate('local-join', {
		successRedirect: '/main',
		failureRedirect: '/join',
		failureFlash: true
	})
)

module.exports = router;