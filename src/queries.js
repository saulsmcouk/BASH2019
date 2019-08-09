let theSpendingPeriods = {
		"Northern Ireland Assembly election 02/03/2017": 3560,
		"UK Parliamentary general election 08/06/2017": 3568,
		"Referendum on the UK’s membership of the EU": 2514,
		"Scottish Parliament election 05/05/2016": 2408,
		"Northern Ireland Assembly election 05/05/2016": 2510,
		"National Assembly for Wales election 05/05/2016": 2512,
		"UK Parliamentary general election 07/05/2015": 445,
		"European Parliamentary Elections 22/05/2014":  410,
		"The Referendum on Independence for Scotland 2014": 404,
		"Parliamentary Voting System Referendum 05/05/2011": 289,
		"Northern Ireland Assembly election 05/05/2011": 303,
		// "Scottish Parliament election 05/05/2011": 
	};

/*
Criteria to filter on:
- Time Period (quarters)
&quarters=2019Q1
&quarters=2019Q12
For multiple years
&quarters=2019Q1&quarters=2018Q3 etc.
- Date Range / regulated period
- Possibly page number?
- Register
- Pre/Post poll included?
- Is Irish source?
- Donor Status(es)
*/
//http://search.electoralcommission.org.uk/?currentPage=1&rows=10&query=Boris%20Johnson&sort=AccountingUnitName&order=asc&tab=1&open=filter&et=pp&et=ppm&et=tp&et=perpar&et=rd&isIrishSourceYes=true&isIrishSourceNo=true&prePoll=false&postPoll=true&register=gb&register=ni&register=none&optCols=Register&optCols=CampaigningName&optCols=AccountingUnitsAsCentralParty&optCols=IsSponsorship&optCols=IsIrishSource&optCols=RegulatedDoneeType&optCols=CompanyRegistrationNumber&optCols=Postcode&optCols=NatureOfDonation&optCols=PurposeOfVisit&optCols=DonationAction&optCols=ReportedDate&optCols=IsReportedPrePoll&optCols=ReportingPeriodName&optCols=IsBequest&optCols=IsAggregation
function generateECDonationsQuery(params) {
	var filters = {
		"currentPage": 1,
		"rows": 50,
		"query": "",
		"regulatedEntity": "",
		"quarters": "",
		"tab": "",
		"includesIrishSources": "true",
		"includesNonIrishSources": "true"
	}
	for (var id in params) {
		filters[id] = params[id];
	}
	return `http://search.electoralcommission.org.uk/api/csv/Donations?currentPage=${filters["currentPage"]}&rows=${filters["rows"]}&query=${encodeURI(filters["query"])}&sort=AcceptedDate&order=desc&tab=${filters["tab"]}&et=pp&et=ppm&et=tp&et=perpar&et=rd&isIrishSourceYes=${filters["includesIrishSources"]}&isIrishSourceNo=${filters["includesNonIrishSources"]}&date=Reported&from=&to=&quarters=${filters["quarters"]}&prePoll=false&postPoll=true&register=gb&register=ni&register=none&optCols=Register&optCols=CampaigningName&optCols=AccountingUnitsAsCentralParty&optCols=IsSponsorship&optCols=IsIrishSource&optCols=RegulatedDoneeType&optCols=CompanyRegistrationNumber&optCols=Postcode&optCols=NatureOfDonation&optCols=PurposeOfVisit&optCols=DonationAction&optCols=ReportedDate&optCols=IsReportedPrePoll&optCols=ReportingPeriodName&optCols=IsBequest&optCols=IsAggregation`;
}

function generateQuartersString(selectedQuarters,year) {
	let quartersString = "";
	for (var n = 0; n < selectedQuarters.length; n++) {
		if (selectedQuarters[n]) {
			quartersString += n+1;
		}
	}
	return year + "Q" + quartersString;
}


function setFilters(){
	let query = document.getElementById("queryInput").value;
			let selectedQuarters = [
				document.getElementById("Q1Checkbox").checked,
				document.getElementById("Q2Checkbox").checked,
				document.getElementById("Q3Checkbox").checked,
				document.getElementById("Q4Checkbox").checked
			]
			let yearSelect = document.getElementById("yearSelect");
			let year = yearSelect.options[yearSelect.selectedIndex].innerHTML;
			window.currentFilters["query"] = query;
			window.currentFilters["quarters"] = generateQuartersString(
				selectedQuarters, year
				);
}

function setSpendingFilters() {
	let query = document.getElementById("spendingQueryInput").value;
	let periodSelect = document.getElementById("selectTimePeriod");
	window.currentFilters["period"] = periodSelect.options[periodSelect.selectedIndex].innerHTML;
	window.currentFilters["query"] = query;
}
/*
search.electoralcommission.org.uk/Search/Donations?currentPage=${filters["currentPage"]}&rows=${filters["rows"]}&query=${filters["query"]}&sort=AccceptedDate&quarters=${filters["quarters"]}&order=desc&tab=${filters["tab"]}&et=pp&et=ppm&et=tp&et=perpar&et=rd&isIrishSourceYes=${filters["includesIrishSources"]}&isIrishSourceNo=${filters["includesNonIrishSources"]}&prePoll=false&postPoll=true&register=gb&register=ni&register=none&optCols=Register&optCols=CampaigningName&optCols=AccountingUnitsAsCentralParty&optCols=IsSponsorship&optCols=IsIrishSource&optCols=RegulatedDoneeType&optCols=CompanyRegistrationNumber&optCols=Postcode&optCols=NatureOfDonation&optCols=PurposeOfVisit&optCols=DonationAction&optCols=ReportedDate&optCols=IsReportedPrePoll&optCols=ReportingPeriodName&optCols=IsBequest&optCols=IsAggregation
*/

function GenECSpendingQuery(params) {
	//TODO: Implement
/*http://search.electoralcommission.org.uk/api/csv/Spending?start={start}&rows={pageSize}&query=&sort=DateIncurred&order=desc&et=pp&et=ppm&et=tp&et=perpar&et=rd&date=&from=&to=&rptPd=&prePoll=false&postPoll=false&period=445&isIrishSourceYes=true&isIrishSourceNo=true&includeOutsideSection75=true
http://search.electoralcommission.org.uk/api/csv/Spending?start={start}&rows={pageSize}&query=&sort=DateIncurred&order=desc&et=pp&et=ppm&et=tp&et=perpar&et=rd&date=&from=&to=&rptPd=&prePoll=false&postPoll=false&period=410&isIrishSourceYes=true&isIrishSourceNo=true&includeOutsideSection75=true
*/
	let theURL =  `http://search.electoralcommission.org.uk/api/csv/Spending?start={start}&rows={pageSize}&query=${params["query"]}&sort=DateIncurred&order=desc&et=pp&et=ppm&et=tp&et=perpar&et=rd&date=&from=&to=&rptPd=&prePoll=false&postPoll=false&period=${params["period"]}&isIrishSourceYes=true&isIrishSourceNo=true&includeOutsideSection75=false`;
	console.log(theURL);
	return theURL;
}