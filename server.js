require("dotenv").config();
var express = require("express");
var path = require("path");
var cheerio = require("cheerio");
var axios = require("axios");
var cors = require("cors");

var app = express();
app.use(cors());

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname+"/views/index.html"));
});
app.get('/pie', function (request, response) {
    response.sendFile(path.join(__dirname+"/views/pie.html"));
});

app.get('/sankey', function (request, response) {
    response.sendFile(path.join(__dirname+"/views/sankey.html"));
});

app.get('/heatmap', function (request, response) {
    response.sendFile(path.join(__dirname+"/views/heatmap.html"));
});

app.get('/voting', function (request, response) {
    response.sendFile(path.join(__dirname+"/views/voting.html"));
});

app.get('/about', function (request, response) {
    response.sendFile(path.join(__dirname+"/views/about.html"));
});

// Serves client-side config (non-secret tokens read from environment variables)
app.get('/api/config', function (request, response) {
    response.json({
        mapboxToken: process.env.MAPBOX_TOKEN || '',
        theyWorkForYouKey: process.env.THEYWORKFORYOU_KEY || '',
        companiesHouseKey: process.env.COMPANIES_HOUSE_KEY || ''
    });
});

app.use("/src", express.static(path.join(__dirname, "./src")));
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/images", express.static(path.join(__dirname, "./images")));

var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
    console.log("Server running on port " + port);
});

app.get('/api/getMpVotes/:url', function(request, response){
    var url = request.params.url;
    var cleanURL = decodeURIComponent(url);
    getMPVotes(cleanURL, function(data) {
        response.json(data);
    });
});

function getMPVotes(url, callback) {
    var votes = [];
    axios.get(url).then(function(html){
        var $ = cheerio.load(html.data);
        $('.policy-vote-overall-stance').each(function(i, elem){
            votes[i] = ($(this).text()).replace(/\s\s+/g, ' ');
        });
        callback(votes);
    }).catch(function(err) {
        console.error("Error fetching MP votes:", err.message);
        callback([]);
    });
}