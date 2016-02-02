
var express = require('express');
var app = express();
var request = require('request');
var config = require('config');
var Yelp = require('yelp');

var yelp = new Yelp({
	consumer_key: config.get('Yelp.consumerKey'),
	consumer_secret: config.get('Yelp.consumerSecret'),
	token: config.get('Yelp.token'),
	token_secret: config.get('Yelp.tokenSecret'),
});

app.get('/', function (req, res) {

	res.header("Access-Control-Allow-Origin", "*");

	var city = req.query.city;
	var results = {
		success: true,
		error: null,
		data: []
	};

	yelp.search({ term: 'pizza', location: city }).then(function (response) {
		var businesses = response.businesses;

		for (var i = 0; i < businesses.length; i++) {
			results.data.push({
				name: businesses[i].name,
				coordinates: businesses[i].location.coordinate
			});
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
