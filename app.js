var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./router/index');

// DATABASE SETTING
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connect('mongodb+srv://test:1234@cluster0-wgaoc.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
});

app.listen(3000, function(){
	console.log("start!! express server on port 3000");
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// routing 처리
app.use(router);