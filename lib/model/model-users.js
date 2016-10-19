var mysql       = require('mysql');
var globals 	= require('./../globals');
var connection 	= mysql.createConnection(globals.database);

function getAllUsers(callback){
	connection.query('SELECT username, userID FROM users', function(err, rows, fields){
		if(err){
			callback(err);
		} else {
			callback(null, rows);
		}
	});
}

function getUser(params, callback){
	connection.query('SELECT username, userID FROM users WHERE username=' + connection.escape(params.username), function(err, rows, fields){
		if(err){
			callback(err);
		} else {
			if(rows.length > 0){
				var userObject = rows[0];
				var modelAlbums = require('./model-albums');
				modelAlbums.getAlbumsByUser({userID: userObject.userID}, function(err, obj){
					if(err){
						callback(err);
					} else {
						userObject.albums = obj;
						callback(null, userObject);
					}
				});
			} else {
				callback(null, []);
			}
		}
	});
}

function createUser(params, callback){

	var newUser = {
		username: params.username,
		password: params.password,
		email: params.email	
	}

	var query = 'INSERT INTO users SET ? ';

	connection.query(query, newUser, function(err, rows, fields) {
	  	if (err) {
			if(err.errno == 1062){
		  		var error = new Error("This username has already been taken.");
		  		callback(error);	  		
			} else {
				callback(err);
			}
		} else {
  			callback(null, {message:'Registration successful!'});
  		}
	});

}

function loginUser(params, callback){
	connection.query('SELECT username, password, userID FROM users WHERE username=' + connection.escape(params.username), function(err, rows, fields) {
		if(err){
	  		callback(err);	  		
		} else if(rows.length > 0){
	  		var response = {
	  			username: rows[0].username,
	  			userID: rows[0].userID
	  		}
	  		callback(null, response);
	  	} else {
	  		var error = new Error("Invalid login");
	  		callback(error);	  		
	  	}
	});
}


function logoutUser(params, callback){
	callback({message: 'You have logged out successfully'});
}

exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
