// Spending

async function GetSpendingData(callback) {
	Toastify({
		text: "GetSpendingData",
		duration: 3000
	}).showToast();
	fetch(GenECSpendingQuery(window.currentFilters))
		.then(data => data.blob())
		.then(async function (data) {
			const response = await new Response(data).text();
			window.tempData = response;
			callback(Papa.parse(response)["data"]);
		})
}

// Donations
async function GetCSVDonationData(callback) {
	Toastify({
		text: "GetCSVDonationData",
		duration: 3000
	}).showToast();
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

// SIC Ranges
var SICRanges = {
	"Agriculture, Forestry and Fishing": [0, 3220],
	"Mining and Quarrying": [5101, 9900],
	"Manufacturing": [10110, 33200],
	"Electricity, gas, steam, and air conditioning supply": [35110, 35300],
	"Water supply, sewerage, waste management and remediation activities": [36000, 39000],
	"Construction": [41100, 43999],
	"Wholesale and retail trade; repair of motor vehicles and motorcycles": [45111, 47990],
	"Transportation and storage": [49100, 53202],
	"Accommodation and food service activities": [55100, 56302],
	"Information and communication": [58110, 63990],
	"Financial and insurance activities": [64110, 66300],
	"Real estate activities": [68100, 68320],
	"Professional, scientific and technical activities": [69101, 75000],
	"Administrative and support service activities": [77110, 82990],
	"Public administration and defence; compulsory social security": [84110, 85600],
	"Human health and social work activities": [86101, 88990],
	"Arts, entertainment and recreation": [90010, 93290],
	"Other service activities": [94110, 96090],
	"Activities of households as employers; undifferentiated goods- and services-producing activities of households for own use": [97000, 98200],
	"Activities of extraterritorial organisations and bodies": [99000, 99999]
}

function inRange(i,a,b) {
	if ((i >= a) && (i <= b)) {
		return true;
	} else {
		return false;
	}
}

function getSIC(companyNumber, callback) {
	let theHeaders = new Headers();
	theHeaders.append("Authorization","-Mywx4fewf6ullDRAJvRreAwVEiiUYaO3IiHqRNK");
	fetch("https://api.companieshouse.gov.uk/company/"+companyNumber, {
		headers: theHeaders
	})
		.then(body => body.json())
		.then(data => {
			callback(data["sic_codes"][data["sic_codes"].length - 1]);	
		})
		.catch(error => console.warn("An error was thrown by getSIC", error));
}

function SICtoPhrase(sic) {
	for (var key in SICRanges) {
		console.log(SICRanges[key][0]);
		if (inRange(sic, SICRanges[key][0], SICRanges[key][1])) {
			return key;
		}
	}
	return "Other";
}
