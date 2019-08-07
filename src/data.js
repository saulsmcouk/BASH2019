//TODO: Learn to construct queries
//TODO: Add more than 50 at a time

async function LoadECDonationData(callback, desired = 100, currentTally = 0, carriedOver = [], pageNumber = 1) {
	console.log(currentTally);
	window.currentFilters.
	var theOverall = generateECDonationsQuery(window.currentFilters);
	var response = fetch(theOverall, {
		"content-type": "application/json"
	})
		.then(body => body.json()).then(data => {
			currentTally += data["Result"].length;
			if (currentTally >= desired) {

				callback(data);
			} else {
				LoadECDonationData(callback, desired, currentTally + data["Result"].length )
			};
		})
		.catch(result => {
			console.log("An error occurred fetching the data");
			console.log(result);
		});


	// function doWork() {
	// 	LoadECDonationData(something).then(theData => {
	// 		// do anything with the data here
	// 	})
	// }\

}

async function _extractPostcodes(data, callback) {
	var postcodes = [];
	for (var i = data["Result"].length - 1; i >= 0; i--) {
		postcodes.push(data["Result"][i]["Postcode"]);
	}
	callback(postcodes);
}

