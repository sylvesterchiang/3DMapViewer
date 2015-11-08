var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Markers = require('../markers');

/* GET users listing. */
router.get('/', function(req, res, next) {

	Markers.find(function(err, posts){
		if (err){
			return next(err);
		}
		res.json(posts);
	});

    res.send('respond with a resource');
});

module.exports = router;
