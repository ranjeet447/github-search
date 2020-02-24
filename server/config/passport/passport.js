var bcrypt = require('bcrypt-nodejs');
 
module.exports = function(passport, user) {
	User = user;
	console.error(user);
	var LocalStrategy = require('passport-local').Strategy;

	//serialize
	passport.serializeUser(function (auth, done) {
		done(null, auth.id);
	});	


	// deserialize user 
	passport.deserializeUser(function (id, done) {
		User.findOne({
			where: {
				id: id
			}
		}).then(function (user) {
			if (user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		});
	});


	passport.use('local-signup', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true // allows us to pass back the entire request to the callback
		},
		function(req, email, password, done) {
			var generateHash = function(password) {
				return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
			};
			User.findOne({
				where: {
					email: email
				},
			}).then(function(user) {
				if (user){
					return done(null, false, {message: 'That email is already taken'});
				} else{
					var userPassword = generateHash(password);
					var data ={
						email: email,
						password: userPassword,
						firstname: req.body.firstname,
						lastname: req.body.lastname
					};
					User.create(data).then(function(newUser, created) {
						if (!newUser) {
							return done(null, false,{message: 'Something went wrong while creating new User'});
						}
						if (newUser) {
							req.session.user=newUser.email;
							return done(null, newUser);
						}
					});
				}
			});
		}
	));

	passport.use('local-signin', new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
			var isValidPassword = function(userpass, password) {
				return bcrypt.compareSync(password, userpass);
			}
			User.findOne({
				where: {
					email: email
				},
			}).then(function(user) {
				if (!user) {
					return done(null, false, {
						message: 'Email not Found'
					});
				}
 
				if (!isValidPassword(user.password, password)) {
					return done(null, false, {
						message: 'Incorrect password'
					});
 
				}
				var userinfo = user.get();
				req.session.user=userinfo.email;
				return done(null, userinfo);
        }).catch(function(err) {
					console.log("Error:", err);
					return done(null, false, {
						message: 'Something went wrong while Signin'
					});
        });
    }
	));
}