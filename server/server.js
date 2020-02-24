var express = require('express');
var app = express();
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For Passport
app.use(session({ secret: 'thisistheway',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('thisistheway'));

 
app.get('/', function(req, res) {
	res.send('Welcome!!');
});

 
//Models
var models = require("./models");
//Routes
var authRoute = require('./routes/auth.js');
app.use('/api',authRoute);
//load passport strategies
require('./config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
	console.log('Database Connection has been established successfully.')
}).catch(function(err) {
	console.error('Unable to connect to the database:', err);
});

var port = process.env.PORT || 5001;
app.listen(port, function(err) {
	if (!err)
		console.log(`Site is live on port ${port}`);
	else console.log(err)
});