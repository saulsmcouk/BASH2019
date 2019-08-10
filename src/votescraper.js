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

function createVotesList() {
    resetVotesList();
    let mp = window.currentFilters["queryInput"]
    getPersonID(mp, data => scrapeVotes(data, out => {
        addVotesList(out);
    }));
}

function setMpInput() {
    let mp = document.getElementById("queryInput").value;
    window.currentFilters["queryInput"] = mp;
}

function addVotesList(list) {
    var votesList = document.getElementById("votesList");
    list.forEach(function(i) {
        var listItem = document.createElement("li");
        var text = document.createTextNode(i);
        listItem.appendChild(text);
        votesList.appendChild(listItem);
    });
}

function resetVotesList() {
    var parent = document.getElementById("votesListDiv");
    var child = document.getElementById("votesList");
    parent.removeChild(child);
    var newChild = document.createElement("ul");
    newChild.setAttribute("id", "votesList");
    parent.appendChild(newChild);
}