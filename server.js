
var express = require('express');
var app = express();
var request = require('request');
var Yelp = require('yelp');
var path = require('path');

require('dotenv').config();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(__dirname + '/'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

var yelp = new Yelp({
    consumer_key: process.env.YELP_CONSUMER_KEY,
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET,
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/search', function (req, res) {
    var results = {
        success: true,
        error: null,
        locations: []
    };

    var params = {
        term: 'pizza'
    };

    if (req.query.city) {
        params.location = req.query.city;
    } else {
        params.ll = req.query.ll;
    }

    yelp.search(params).then(function (response) {
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

app.listen(process.env.PORT || 5000, function () {
    console.log('Example app listening on port 5000!');
});
