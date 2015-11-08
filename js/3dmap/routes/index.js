var express = require('express');
var router = express.Router();
var https = require('https');
var jquery = require('jQuery');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log(req.query.test)

  var directions = [];
  var end = 0;
  var counter = 0;

  var options = {
        host: 'maps.googleapis.com',
        //path: '/maps/api/directions/json?origin=Toledo&destination=Madrid&region=es&key=AIzaSyC6U0ex_0ClX8ZiEU9schuHfIFSyQ1KXKE'
  		path: '/maps/api/directions/json?origin=Toledo&destination=Madrid&region=es&key=AIzaSyC6U0ex_0ClX8ZiEU9schuHfIFSyQ1KXKE'
  };

  var consoleCallback = console.log;

  var altitudeCallback = function(resp){
  	console.log('altitude callback');
  	var body = '';

  	resp.on('data', function(d){
  		body += d;
  	});

  	resp.on('end', function(){
  		console.log(res.headersSent);
  		result = JSON.parse(body);

  		for (var i = 0; i < result.results.length; i++){
  			directions[i].elevation = result.results[i].elevation;
  			console.log(result.results[i].elevation);
  		}

  		console.log(res.headersSent)
  		res.send(directions);
  	});
  };

   var callback = function(response) {
	 // variable that will save the result
	 var result = '';

	 // every time you have a new piece of the result
	 response.on('data', function(chunk) {
	   result += chunk;
	 });

	 // when you get everything back
	 response.on('end', function() {
	   //console.log(JSON.parse(result).routes)
	   steps = JSON.parse(result).routes[0].legs[0].steps
	   console.log('number of steps');
	   console.log(JSON.parse(result).routes[0].legs[0].steps.length);
  
       for (var i = 0; i < steps.length; i++ ){
       		if (i < 10){
	       		x1 = steps[i].start_location.lng - steps[i].end_location.lng;
	       		y1 = steps[i].start_location.lat - steps[i].end_location.lat;

	       		x2 = 0;
	       		y2 = 1;

	       		dot = x1 * x2 + y1 * y2;
	       		det = x1 * y2 - y1 * x2;
	       		angle = Math.atan2(det, dot)

		        var tempStep = {
		     		"lat": steps[i].start_location.lat,
		     		"lng": steps[i].start_location.lng, 
		     		"direction": angle, 
		     		"elevation": 0
		     	}

		     	console.log(tempStep);

				directions.push(tempStep)	 

				console.log('directions calculated');

				console.log(directions.length);
			}			   	
	     }

	     end = directions.length;

		var altitudePath = '/maps/api/elevation/json?locations='

		for (var i = 0; i < directions.length; i++){
			if (i == 0)
	 			altitudePath += directions[i].lat +','+ directions[i].lng;
			else
				altitudePath += '|' + directions[i].lat + ',' + directions[i].lng;
			} 	

			altitudePath += '&key=AIzaSyC6U0ex_0ClX8ZiEU9schuHfIFSyQ1KXKE';

			https.request({
				host: 'maps.googleapis.com',
				path: altitudePath
			}, altitudeCallback).end();
	   });
	}

	https.request(options, callback).end();

});

module.exports = router;
