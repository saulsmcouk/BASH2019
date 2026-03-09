async function getConfig() {
    if (window._appConfig) return window._appConfig;
    const res = await fetch('/api/config');
    window._appConfig = await res.json();
    return window._appConfig;
}

async function scrapeVotes(id, callback) {
    var url = "https://www.theyworkforyou.com/mp/" +
        id +
        "/divisions";
    var encodedurl = encodeURIComponent(url);
    var apicall = "/api/getMpVotes/" + encodedurl;
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



async function getPersonID(mp, callback) {
    var config = await getConfig();
    var formatMP = encodeURIComponent(mp);
    var key = config.theyWorkForYouKey;
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