var mysql       = require('mysql');
var globals 	= require('./../globals');
var connection = mysql.createConnection(globals.database);

function createAlbum(params, callback){	
	var query = 'INSERT INTO albums SET ? ';
	connection.query(query, params, function(err, rows, fields){
		if(err){
			callback(err);
		} else {
			var response = {
				id 		: rows.insertId,
				title 	: params.title
			};
			callback(null, response);
		}
	});
}

function getAlbumsByUser(params, callback){
	var query = 'SELECT albumID, title FROM albums WHERE userID=' + connection.escape(params.userID);
	connection.query(query, function(err, rows, fields){
		if(err){
			callback(err);
		} else {
			callback(null, rows);
		}		
	});	
}

function getAlbumByID(params, callback){
	var query = 'SELECT title, albumID, userID FROM albums WHERE albumID=' + connection.escape(params.albumID);
	connection.query(query, function(err, rows, fields){
		if(rows.length > 0){
			getPhotosForAlbum(rows[0], function(err, obj){
				if(err){
					callback(err);
				} else {
					callback(null, obj);
				}
			});
		} else {
			callback(null, []);
		}
	});
}

function deleteAlbum(params, callback){
	var query = 'UPDATE albums SET published=0 WHERE albumID=' + connection.escape(params.albumID);
	connection.query(query, function(err, rows, fields){
		if(err){
			callback(err);
		} else {
			callback(null, {message: 'Album deleted successfully'});
		}		
	});
}

function getPhotosForAlbum(album, callback){
	var modelPhotos = require('./model-photos');
	modelPhotos.getPhotosByAlbumID(album, function(err, obj){
		if(err){
			callback(err);
		} else {
			album.photos = obj;
			callback(null, album);
		}
	});
}

exports.createAlbum = createAlbum;
exports.deleteAlbum = deleteAlbum;
exports.getAlbumsByUser = getAlbumsByUser;
exports.getAlbumByID = getAlbumByID;

