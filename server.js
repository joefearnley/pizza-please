
var express = require('express');
var app = express();
var request = require('request');

app.get('/', function (req, res) {
	request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=cruise&key=AIzaSyDAIP3blcmp_GmTunYObhYLuhuw6DXovic',
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.send(body);
			} else {
				res.send(error);
			}
		});
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
