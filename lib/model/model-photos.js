var mysql       = require('mysql');
var globals 	= require('./../globals');
var connection 	= mysql.createConnection(globals.database);

function createPhoto(params, callback){
	var query = 'INSERT INTO photos SET ? ';
	connection.query(query, params, function(err, rows, fields){
		if(err){
			callback(err);
		} else {
			var response = {
				id 		: rows.insertId
			};
			callback(null, response);
		}
	});

}

function getPhotoByID(params, callback){
	var query = 'SELECT photoID, caption, albumID, userID FROM photos WHERE published=1 AND photoID=' + connection.escape(params.photoID);
	connection.query(query, function(err, rows, fields){
		if(err){
			callback(err);
		} else {
			if(rows.length > 0){
				callback(null, rows);
			} else {
				callback(null, []);
			}
		}
	});
}

function getPhotosByAlbumID(params, callback){
	var query = 'SELECT photoID, caption, albumID, userID FROM photos WHERE published=1 AND albumID=' + connection.escape(params.albumID);
	connection.query(query, function(err, rows, fields){
		if(err){
			callback(err);
		} else {
			if(rows.length > 0){
				callback(null, rows);
			} else {
				callback(null, []);
			}
		}
	});
}

function deletePhotoByID(params, callback){
	var query = 'UPDATE photos SET published=0 WHERE photoID=' + connection.escape(params.photoID);
	connection.query(query, function(err, rows, fields){
		if(rows.length > 0){
			callback(null, rows);
		} else {
			callback(null, []);
		}
	});
}

exports.createPhoto = createPhoto;
exports.getPhotoByID = getPhotoByID;
exports.getPhotosByAlbumID = getPhotosByAlbumID;
exports.deletePhotoByID = deletePhotoByID;