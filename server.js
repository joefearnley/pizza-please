
const express = require('express');
const app = express();
const request = require('request');
const Yelp = require('yelp');
const path = require('path');

require('dotenv').config();

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(__dirname + '/'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

const yelp = new Yelp({
    consumer_key: process.env.YELP_CONSUMER_KEY,
    consumer_secret: process.env.YELP_CONSUMER_SECRET,
    token: process.env.YELP_TOKEN,
    token_secret: process.env.YELP_TOKEN_SECRET,
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/search', (req, res) => {
    let results = {
        success: true,
        error: null,
        locations: []
    };

    const params = {
        term: 'pizza'
    };

    if (req.query.city) {
        params.location = req.query.city;
    } else {
        params.ll = req.query.ll;
    }

    yelp.search(params).then( response => {
        for (let i = 0; i < response.businesses.length; i++) {
            results.locations.push(response.businesses[i]);
        }

        res.send(results);
    }).catch( err => {
        results.success = true,
        results.error = error;
        res.send(results);
    });
});

app.listen(process.env.PORT || 5000, () => {
    console.log('Example app listening on port 5000!');
});
