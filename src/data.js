//TODO: Learn to construct queries
//TODO: Add more than 50 at a time

async function LoadECDonationData(callback, desired = 100, currentTally = 0, carriedOver = [], pageNumber = 1) {
	console.log(currentTally);
	// window.currentFilters
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
}


async function GetCSVDonationData(callback) {
	fetch(generateECDonationsQuery(window.currentFilters))
		.then(data => data.blob())
		.then(async function (data){
			const response = await new Response(data).text();
			callback(Papa.parse(response)["data"]);
		});
}

function _extractPostcodes(data, callback) {
	let postcodes = [];
	data.forEach(function(d) {
		postcodes.push(d[12]);
	});
	const validPostcodeRegex = new RegExp('^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$');
    callback(postcodes.filter(x => validPostcodeRegex.test(x)));
}

