var express = require("express");
var path = require("path");
var cheerio = require("cheerio");
var axios = require("axios");
//var request = require("request");

var app = express();

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

app.use("/src", express.static(path.join(__dirname, "./src")));
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use("/images", express.static(path.join(__dirname, "./images")));

var server = app.listen(3000, function(){

});

app.get('/api/getMpVotes/:url', function(request, response){
    var url = request.params.url;
    var cleanURL = decodeURIComponent(url);
    getMPVotes(cleanURL, data => {
        response.json(data);
    });
});

function getMPVotes(url, callback) {
    var votes = [];
    var html = axios.get(url).then(function(html){
        var $ = cheerio.load(html.data);
        $('.policy-vote-overall-stance').each(function(i, elem){
            votes[i] = ($(this).text()).replace(/\s\s+/g, ' ');
        });
        callback(votes);
    });
}