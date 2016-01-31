
var express = require('express');
var app = express();
var request = require('request');



app.get('/', function (req, res) {

	//console.log(req.params);

	var city = req.param('city');
	var results = {
		success: true,
		error: null,
		data: []
	};

	//request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&types=food&name=cruise&key=AIzaSyDAIP3blcmp_GmTunYObhYLuhuw6DXovic',
	request('https://maps.googleapis.com/maps/api/place/textsearch/json?query=pizza+in+' + city + ' &key=AIzaSyDAIP3blcmp_GmTunYObhYLuhuw6DXovic',
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var resultsFromGoogle = JSON.parse(response.body).results;

				for (var i = 0; i < resultsFromGoogle.length; i++) {
					results.data.push(resultsFromGoogle[i].name);
				}

				res.send(results);
			} else {
				results.success = false;
				results.error = error;
				res.send(results);
			}
		});
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
