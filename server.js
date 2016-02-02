
var express = require('express');
var app = express();
var request = require('request');
var config = require('config');
var Yelp = require('yelp');
var path = require("path");

app.use(express.static(__dirname + '/'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var yelp = new Yelp({
	consumer_key: config.get('Yelp.consumerKey'),
	consumer_secret: config.get('Yelp.consumerSecret'),
	token: config.get('Yelp.token'),
	token_secret: config.get('Yelp.tokenSecret'),
});

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/search', function (req, res) {

	res.header("Access-Control-Allow-Origin", "*");

	var city = req.query.city;
	var results = {
		success: true,
		error: null,
		locations: []
	};

	yelp.search({ term: 'pizza', location: city }).then(function (response) {
		var businesses = response.businesses;

		for (var i = 0; i < businesses.length; i++) {
			results.locations.push(businesses[i]);
		}

		res.send(results);
	}).catch(function (err) {
		results.success = true,
		results.error = error;
		res.send(results);
	});
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
