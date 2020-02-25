var express = require('express');
var app = express();
var passport   = require('passport')
var session    = require('express-session')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var cors = require('cors')
//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Enable All CORS Requests
app.use(cors({ origin:true, credentials:true }));

var whitelist = ['http://localhost:3000'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(function(req, res, next) {
	// res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
  });
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

app.use((req, res, next) => {
	res.set('Access-Control-Allow-Origin', '*')
	next()
})

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