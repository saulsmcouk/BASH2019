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
//http://search.electoralcommission.org.uk/?currentPage=1&rows=10&query=Boris%20Johnson&sort=AccountingUnitName&order=asc&tab=1&open=filter&et=pp&et=ppm&et=tp&et=perpar&et=rd&isIrishSourceYes=true&isIrishSourceNo=true&prePoll=false&postPoll=true&register=gb&register=ni&register=none&optCols=Register&optCols=CampaigningName&optCols=AccountingUnitsAsCentralParty&optCols=IsSponsorship&optCols=IsIrishSource&optCols=RegulatedDoneeType&optCols=CompanyRegistrationNumber&optCols=Postcode&optCols=NatureOfDonation&optCols=PurposeOfVisit&optCols=DonationAction&optCols=ReportedDate&optCols=IsReportedPrePoll&optCols=ReportingPeriodName&optCols=IsBequest&optCols=IsAggregation#
function generateECDonationsQuery(params) {
	var filters = {
		"currentPage": 1,
		"rows": 50,
		"query": "",
		"quarters": "",
		"tab": "",
		"includesIrishSources": "true",
		"includesNonIrishSources": "true"
	}
	for (var id in params) {
		filters[id] = params[id];
	}
	return `http://search.electoralcommission.org.uk/api/Search/Donations?currentPage=${filters["currentPage"]}&rows=${filters["rows"]}&query=${filters["query"]}&sort=AcceptedDate&order=desc&tab=${filters["tab"]}&et=pp&et=ppm&et=tp&et=perpar&et=rd&isIrishSourceYes=${filters["includesIrishSources"]}&isIrishSourceNo=${filters["includesNonIrishSources"]}&date=Reported&from=&to=&quarters=${filters["quarters"]}&prePoll=false&postPoll=true&register=gb&register=ni&register=none&optCols=Register&optCols=CampaigningName&optCols=AccountingUnitsAsCentralParty&optCols=IsSponsorship&optCols=IsIrishSource&optCols=RegulatedDoneeType&optCols=CompanyRegistrationNumber&optCols=Postcode&optCols=NatureOfDonation&optCols=PurposeOfVisit&optCols=DonationAction&optCols=ReportedDate&optCols=IsReportedPrePoll&optCols=ReportingPeriodName&optCols=IsBequest&optCols=IsAggregation`;
}

/*
search.electoralcommission.org.uk/Search/Donations?currentPage=${filters["currentPage"]}&rows=${filters["rows"]}&query=${filters["query"]}&sort=AccceptedDate&quarters=${filters["quarters"]}&order=desc&tab=${filters["tab"]}&et=pp&et=ppm&et=tp&et=perpar&et=rd&isIrishSourceYes=${filters["includesIrishSources"]}&isIrishSourceNo=${filters["includesNonIrishSources"]}&prePoll=false&postPoll=true&register=gb&register=ni&register=none&optCols=Register&optCols=CampaigningName&optCols=AccountingUnitsAsCentralParty&optCols=IsSponsorship&optCols=IsIrishSource&optCols=RegulatedDoneeType&optCols=CompanyRegistrationNumber&optCols=Postcode&optCols=NatureOfDonation&optCols=PurposeOfVisit&optCols=DonationAction&optCols=ReportedDate&optCols=IsReportedPrePoll&optCols=ReportingPeriodName&optCols=IsBequest&optCols=IsAggregation



*/