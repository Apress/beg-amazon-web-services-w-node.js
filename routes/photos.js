var express 	= require('express');
var router 		= express.Router();
var model 		= require('./../lib/model/model-photos');

/* GET photo by ID */
router.get('/id/:id', function(req, res) {
	if(req.param('id')){
		var params = {
			photoID : req.param('id')
		}
		model.getPhotoByID(params, function(err, obj){
			if(err){
					res.status(400).send({error: 'Invalid photo ID'});
			} else {
				res.send(obj);
			}
		});
	} else {
		res.status(400).send({error: 'Invalid login'});		
	}
});

/* POST create photo. */
router.post('/upload', function(req, res) {
 	if(req.param('albumID') && req.param('userID')){
 		var params = {
 			userID 		: req.param('userID'),
 			albumID 	: req.param('albumID')
 		}
 		if(req.param('caption')){
 			params.caption = req.param('caption');
 		}

 		model.createPhoto(params, function(err, obj){
			if(err){
					res.status(400).send({error: 'Invalid photo data'});
			} else {
				res.send(obj);
			}
 		});
	} else {
		res.status(400).send({error: 'Invalid photo data'});				
	}
});

/* POST delete photo. */
router.post('/delete', function(req, res) {
	if(req.param('id')){
		var params = {
			photoID : req.param('id')
		}
		model.deletePhoto(params, function(err, obj){
			if(err){
				res.status(400).send({error: 'Photo not found'});
			} else {
				res.send(obj);
			}
		});
	} else {
		res.status(400).send({error: 'Invalid photo ID'});		
	}
});


module.exports = router;
