function scrapeVotes(id, callback) {
    var url = "https://www.theyworkforyou.com/mp/" +
        id +
        "/divisions";
    var encodedurl = encodeURIComponent(url);
    var apicall = "http://localhost:3000/api/getMpVotes/"+encodedurl;
    var response = fetch(apicall, {
        "content-type": "application/json"
    })
        .then(body => body.json()).then(
            function (data) {
                console.log(data);
                callback(data)
            }
        )
    //pass url to node js server thingy and it returns list of voting stances
}



function getPersonID(mp, callback) {
    var formatMP = encodeURIComponent(mp);
    var key = "FFyAQqBAqZQWG9cd6KFVkQew";
    var url = "https://www.theyworkforyou.com/api/getMPs?search=" +
        formatMP +
        "&output=js&key=" +
        key;
    var response = fetch(url, {
        "content-type": "application/json"
    })
        .then(body => body.json()).then(
            function (data) {
                var id = data[0]["person_id"];
                callback(id);
        })
        .catch(function(result){
            console.log("theyworkforyou API call unsuccessful.");
            console.log("mp was not found");
            console.log(result);
        });
}

// console.log(getPersonID("Diane Abbott", data => scrapeVotes(data, out => {return out})));