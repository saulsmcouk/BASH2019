//TODO: Learn to construct queries
//TODO: Add more than 50 at a time

async function LoadECDonationData(callback) {
	// Construct an EC database query
	// var basicURL = "http://search.electoralcommission.org.uk/api/Search/Donations?";
	// var theQUery = "currentPage=1&rows=10&sort=AcceptedDate&order=desc&tab=1&open=filter&et=pp&et=ppm&et=tp&et=perpar&et=rd&isIrishSourceYes=true&isIrishSourceNo=true&date=Reported&from=&to=&quarters=${quarters}&prePoll=true&postPoll=true&donorStatus=company&register=none&register=gb&optCols=Register&optCols=CampaigningName&optCols=AccountingUnitsAsCentralParty&optCols=IsSponsorship&optCols=IsIrishSource&optCols=RegulatedDoneeType&optCols=CompanyRegistrationNumber&optCols=Postcode&optCols=NatureOfDonation&optCols=PurposeOfVisit&optCols=DonationAction&optCols=ReportedDate&optCols=IsReportedPrePoll&optCols=ReportingPeriodName&optCols=IsBequest&optCols=IsAggregation";
	// var theOverall = basicURL + theQUery;
	// //***TEMP
	var theOverall = "http://search.electoralcommission.org.uk/api/Search/Donations?currentPage=1&rows=64349&sort=AcceptedDate&order=desc&tab=1&et=pp&et=ppm&et=tp&et=perpar&et=rd&isIrishSourceYes=true&isIrishSourceNo=true&prePoll=false&postPoll=true&register=gb&register=ni&register=none&optCols=Register&optCols=CampaigningName&optCols=AccountingUnitsAsCentralParty&optCols=IsSponsorship&optCols=IsIrishSource&optCols=RegulatedDoneeType&optCols=CompanyRegistrationNumber&optCols=Postcode&optCols=NatureOfDonation&optCols=PurposeOfVisit&optCols=DonationAction&optCols=ReportedDate&optCols=IsReportedPrePoll&optCols=ReportingPeriodName&optCols=IsBequest&optCols=IsAggregation";
	
	var response = fetch(theOverall, {
		"content-type": "application/json"
	})
		.then(body => body.json()).then(
			function (data) {
				callback(data);
			})
		.catch(function (result) {
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
