var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  console.log(req.query.test)
  console.log(req.query.what)

  var options = {
        host: 'maps.googleapis.com',
        //path: '/maps/api/directions/json?origin=Toledo&destination=Madrid&region=es&key=AIzaSyC6U0ex_0ClX8ZiEU9schuHfIFSyQ1KXKE'
  		path: '/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyC6U0ex_0ClX8ZiEU9schuHfIFSyQ1KXKE'
  };

  https.get('https://maps.googleapis.com/maps/api/directions/json?origin=Toledo&destination=Madrid&region=es&key=AIzaSyC6U0ex_0ClX8ZiEU9schuHfIFSyQ1KXKE', function(resp){
  	//resp.setEncoding('utf8');
  	//res.charset = 'value'
  	//res.writeHead(200, {"Content-Type": "application/json"})
  	//resp.set({ 'content-type': 'application/json; charset=utf-8' })
  	body = "";

  	resp.on('data', function(d) {
  		//var jsonObject = JSON.parse(JSON.stringify(d));

  		//var jsonObject = JSON.parse(JSON.stringify(d.replace('"', '')));
  		//var jsonObject = eval("(" + d + ")")
  		body += d
	  	
	  	console.log(JSON.parse(body))
		//console.log(Object.getOwnPropertyNames ( d ))
	});
  });

});

module.exports = router;
