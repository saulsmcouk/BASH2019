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

function generateECDonationsQuery(filters) {
	let theQuery = "http://search.electoralcommission.org.uk/api/Search/Donations?";
	for (var id in filters) {
		theQuery = theQuery + "&" + id + "=" + filters[id];
	}
	return theQuery;
}