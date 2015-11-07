var express = require('express');
var router = express.Router();
var https = require('https');
var jquery = require('jQuery');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log(req.query.test)
  console.log(req.query.what)

  directions = []

  var options = {
        host: 'maps.googleapis.com',
        //path: '/maps/api/directions/json?origin=Toledo&destination=Madrid&region=es&key=AIzaSyC6U0ex_0ClX8ZiEU9schuHfIFSyQ1KXKE'
  		path: '/maps/api/directions/json?origin=Toledo&destination=Madrid&region=es&key=AIzaSyC6U0ex_0ClX8ZiEU9schuHfIFSyQ1KXKE'
  }

  var consoleCallback = console.log;

	callback = function(response) {
	   // variable that will save the result
	   var result = '';

	   // every time you have a new piece of the result
	   response.on('data', function(chunk) {
	      result += chunk;
	   });

	   // when you get everything back
	   response.on('end', function() {
	     res.send(result);
	     console.log(JSON.parse(result).routes)
	     legs = JSON.parse(result).routes[0].legs

	     for (var i = 0; i < legs.length; i++ ){
	     	directions.push(legs[i])
	     }

	     console.log(directions)
	   });
	}



	https.request(options, callback).end();
});

module.exports = router;
