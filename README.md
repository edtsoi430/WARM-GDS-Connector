# Google Data Studio Connector for Wild Apricot

# Project Description
Wild Apricot is the #1 rated Membership Management platform that enables membership-based organizations to manage their contact database and all members transactions with ease. The system has many modules including events, membership renewals, donations and an online store. It also enables administrators to customizable their contact and member database. Members and administrators are able to manipulate data such as membership status, event registration, online payments with ease.

The built in reporting system in Wild Apricot does not allow easy summarization and visualization of Wild Apricot member and contact transactions. The comprehensive real-time report capabilities in Google Data Studio are a perfect solution that helps administartors integrate Wild Apricot data with a variety of external analytical systems like Google Ads and Google Analytics. This project is a Google Data Studio community data connector built to retrieve data from Wild Apricot, which can be summarized and transformed in GDS to create user-friendly and real-time dashboard for Wild Apricot.

Data is fetched in real-time, securely using Wild Apricot's REST API.

The code is maintained by [NewPath Consulting](https://www.newpathconsulting.com/warm).

# Features
This community data connector is written in JavaScript and supports the following API calls.

* Account
* Members/Contacts
* Events
* Invoices
* Auditlog

# Installation

This is a Community (aka Open Source Connector, but it has not yet been published by Google as a public connector in the [GDS connector repository](https://datastudio.google.com/data).

To use the connector for your own use you can install the code in the src folder and install it using the [GDS deployment procedures](https://developers.google.com/datastudio/connector/deploy).
  
# Sample Dashboard (Google Data Studio)
[Sample Wild Apricot Report in PDF](https://github.com/asirota/gds-wildapricot-connector/blob/master/images/Simple%20Wild%20Apricot%20Report%20in%20Google%20Data%20Studio.pdf)
[Sample Wild Apricot Report in Google Data Studio (live)](https://datastudio.google.com/embed/reporting/1AvG9S97XRA7fE9QIaVAtMZ3QQG511wq6/page/LiZU)


Dashboards can be customized flexibly according to a report writers requirements using one or more data sources.
    
# References
 [GDS Authentication Docs](https://developers.google.com/datastudio/connector/auth)

 [GDS Community Connector Docs](https://developers.google.com/datastudio/connector)
 
 [GDS GitHub Repositories and Experiments](https://github.com/googledatastudio)

 [Wild Apricot API Documentation](https://gethelp.wildapricot.com/en/articles/182-using-wild-apricots-api)

 [Wild Apricot Product Description](https://www.wildapricot.com/membership-management-software)
 
