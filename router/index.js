var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
var main = require('./main');
var email = require('./email');

router.get('/', function(req, res){
	// res.sendFile(`${__dirname}/public/main.html`);
	res.sendFile(path.join(__dirname, '../public/main.html'));
});

router.use('/main', main);
router.use('/email', email);

// router.get('/login', function(req, res){
// 	res.render('login.ejs');
// });

// app.post('/login_form', function(req, res){
// 	var responseData = {'result': 'ok', 'id': req.body.id, 'pw': req.body.password}
// 	res.json(responseData);
// });

module.exports = router;