var express = require("express");
var path = require("path");
var cheerio = require("cheerio");
//var request = require("request");

var app = express();

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname+"/index.html"));
});

app.use("/src", express.static(path.join(__dirname, "./src")));

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
    var $ = cheerio.load(url);
    $('.policy-vote-overall-stance').each(function(i, elem){
      votes[i] = $(this).text();
      console.log(votes[i]);
    });
    callback (url)
  }