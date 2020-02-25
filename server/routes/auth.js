
const passport = require('passport');
var express = require('express');
const router = express.Router();

const cookieOPtions={ maxAge: 9000000, httpOnly: true,signed:true};

router.post('/signup', function(req, res, next ){
	passport.authenticate('local-signup', function(err, user, info) {
		if (err) { return next(err) }
		if (!user) { return res.json( {auth:false, message: info.message}) }	
		res.cookie('email',user.email, cookieOPtions)
		.json({auth:true,user});
	})(req, res, next);   
});
router.post('/login', function(req, res, next ){
	passport.authenticate('local-signin', function(err, user, info) {
		if (err) { return next(err) }
		if (!user) { return res.json( {auth:false, message: info.message}) }	
		res.cookie('email',user.email,cookieOPtions)
		.json({auth:true,user});
	})(req, res, next);   
});

router.get("/logout", function (req, res) {
	res.clearCookie('email', {expires: new Date()});
	req.session.destroy(function (err) {
		if (err) console.log(err);
		res.json({auth:false,message:'Logged Out'});
	});
});

router.get("/auth", function (req, res) {
	// console.log(req.session,req.signedCookies['email'])
	if (req.session.user
		&& req.session.user==req.signedCookies['email']
		)res.json({auth:true,message:'Logged In'});
	else res.json({auth:false,email:req.signedCookies['email']});
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.json({auth:false,message:'Authentication error!!'});
}

module.exports = router;
