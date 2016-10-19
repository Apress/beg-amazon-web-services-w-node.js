var express 	= require('express');
var router 		= express.Router();
var model 		= require('./../lib/model/model-users');

/* GET users listing. */
router.get('/', function(req, res) {
  model.getAllUsers(function(err, obj){
  	if(err){
  		res.status(500).send({error: 'An unknown server error has occurred!'});
  	} else {
  		res.send(obj);
  	}
  })
});


/* GET albums by user */
router.get('/user/:user', function(req, res) {
	var params= {
		username: req.param('user')
	}
	model.getUser(params, function(err, obj){
		if(err){
	  		res.status(500).send({error: 'An unknown server error has occurred!'});
	  	} else {
	  		res.send(obj);
	  	}
	});
});

/* POST user login. */
router.post('/login', function(req, res) {
	if(req.param('username') && req.param('password') ){
		var params = {
			username: req.param('username').toLowerCase(),
			password: req.param('password')
		};

		model.loginUser(params, function(err, obj){
			if(err){
				res.status(400).send({error: 'Invalid login'});
			} else {
				res.send(obj);
			}
		});		
	} else {
		res.status(400).send({error: 'Invalid login'});
	}
});

/* POST user logout. */
router.post('/logout', function(req, res) {
	if(req.param('userID')){
		model.logoutUser({}, function(err, obj){
			if(err){
				res.status(400).send({error: 'Invalid user'});
			} else {
				res.send(obj);
			}
		});
	} else {
		res.status(400).send({error: 'Invalid user'});		
	}
});

/* POST user registration. */
router.post('/register', function(req, res) {
	if(req.param('username') && req.param('password') && req.param('email')){
		var email = unescape(req.param('email'));
		var emailMatch = email.match(/\S+@\S+\.\S+/);
		if (emailMatch !== null) {
			var params = {
				username: req.param('username').toLowerCase(),
				password: req.param('password'),
				email: req.param('email').toLowerCase()
			};

			model.createUser(params, function(err, obj){
				if(err){
					res.status(400).send({error: 'Unable to register'});
				} else {
					res.send(obj);
				}
			});
		} else {
			res.status(400).send({error: 'Invalid email'});
		}
	} else {
		res.status(400).send({error: 'Missing required field'});
	}
});

module.exports = router;
