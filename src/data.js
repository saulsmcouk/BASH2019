async function GetCSVDonationData(callback) {
	Toastify({
		text: "GetCSVDonationData",
		duration: 3000
	}).showToast();
	fetch(generateECDonationsQuery(window.currentFilters))
		.then(data => data.blob())
		.then(async function (data){
			const response = await new Response(data).text();
			window.tempData = Papa.parse(response)["data"];
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

