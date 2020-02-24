
const passport = require('passport');
var express = require('express');
const router = express.Router();

router.post('/signup', function(req, res, next ){
	passport.authenticate('local-signup', function(err, user, info) {
		if (err) { return next(err) }
		if (!user) { return res.json( {auth:false, message: info.message}) }	
		res.cookie('email',user.email, { maxAge: 900000, httpOnly: true,signed:true})
		.json({auth:true,user});
	})(req, res, next);   
});
router.post('/login', function(req, res, next ){
	passport.authenticate('local-signin', function(err, user, info) {
		if (err) { return next(err) }
		if (!user) { return res.json( {auth:false, message: info.message}) }	
		res.cookie('email',user.email, { maxAge: 900000, httpOnly: true,signed:true})
		.json({auth:true,user});
	})(req, res, next);   
});

router.get("/logout", function (req, res) {
	req.session.destroy(function (err) {
			if (err) console.log(err);
			res.json({auth:false});
	});
});

router.get("/auth", function (req, res) {
	if (req.session.user && req.session.user==req.signedCookies['email'])res.json({auth:true});
	else res.json({auth:false});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.json({auth:false});
}

module.exports = router;
