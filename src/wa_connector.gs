// ------------------------------------------------------------------------------------------------------------------
// Google Data Studio Community Data Connector for Wild Apricot
// Copyright (c) 2018-19 NewPath Consulting
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <https://www.gnu.org/licenses/>.
//
// Originally created by Edmond Tsoi (https://github.com/edtsoi430) for NewPath Consulting Inc.
// Maintained by Lon Motero (https://github.com/lmatero) for NewPath Consulting Inc.
// Further developed and restructured by Dennis Yoseph Zvigelsky (https://github.com/dzvigelsky) for NewPath Consulting Inc.
// Contact NewPath Consulting for support at https://www.newpathconsulting.com

var wa_connector = wa_connector || {}; // creates the connector Class, which will be called in Code.gs

var API_PATHS = { // Api path that will be called in the getData function
    auth: "https://oauth.wildapricot.org/auth/token",
    accounts: "https://api.wildapricot.org/v2.1/accounts/"
  };

wa_connector.getConfig = function(request) { // code for getConfig function
  var config = {
    configParams: [
      {
        name: "apikey",
        type: "TEXTINPUT",
        displayName: "API Key",
        helpText: "Please enter your Wild Apricot API Key:",
        placeholder: "30 characters..."
      },
      {
        name: "resource",
        type: "SELECT_SINGLE",
        displayName: "Select an Wild Apricot API endpoint.",
        helpText: "The data connector will retrieve all data for the selected API endpoint.",
        options: [
          {
            label: "Account",
            value: "account"
          },
          {
            label: "Members",
            value: "members"
          },
          {
            label: "Membership Level",
            value: "membershipLevels"
          },
          {
            label: "Event",
            value: "event"
          },
          {
            label: "AuditLog",
            value: "auditLog"
          },
          {
            label: "Invoices",
            value: "invoices"
          }
        ]
      },
      {
        name: "invoicesTop",
        type: "TEXTINPUT",
        displayName: "Latest Number of Invoices",
        helpText: "Please enter the maximum number of invoice entries to be returned:"
      },
      {
        name: "auditLogStartDate",
        type: "TEXTINPUT",
        displayName: "Start Date - AuditLog",
        helpText: "Please enter the start date for your Audit Logs (YYYY/MM/DD):"
      },
      {
        name: "auditLogEndDate",
        type: "TEXTINPUT",
        displayName: "End Date - AuditLog",
        helpText: "Please enter the end date for your Audit Logs (YYYY/MM/DD):"
      }
    ]
  };
  return config;
}

wa_connector.getSchema = function(request) {
  return { schema: WASchema[request.configParams.resource] };
}

wa_connector.getData = function(request) {

  var schema = WASchema[request.configParams.resource];
  console.log(schema);

  var selectedDimensionsMetrics = _filterSelectedItems(schema, request.fields);
  console.log(selectedDimensionsMetrics);

  var token = _getAccessToken(request.configParams.apikey);
  console.log(token);

  var account = _fetchAPI(API_PATHS.accounts, token)[0];

  var rows = [];

  if (request.configParams.resource == "account") { //ACCOUNT
    var row = [];
    selectedDimensionsMetrics.forEach(function(field) {
      switch (field.name) {
        case "Id":
          row.push(account.Id.toString());
          break;
        case "PrimaryDomainName":
          row.push(account.PrimaryDomainName);
          break;
        default:
          //row.push("");
      }
    });
    rows.push({ values: row });
  } else if (request.configParams.resource == "members") { // MEMBER Endpoint
    var membersEndpoint = // API url with various parameters
      API_PATHS.accounts +
      account.Id +
        "/Contacts?$async=false&$select='Status";
    var members = _fetchAPI(membersEndpoint, token); // returns object that contains data from the API call
    members.Contacts.forEach(function(member) { // iterate through all the fields
      var row = []; // create empty array to hold fields
      selectedDimensionsMetrics.forEach(function(field) {

        switch (field.name) { // Since we are iterating, then every possible field for the endpoint will be pushed to row list.
          case "Id":
            if(typeof member.Id === 'undefined') row.push("");
            else row.push(member.Id);
            break;
          case "FirstName":
            if(typeof member.FirstName === 'undefined') row.push("");
            else row.push(member.FirstName);
            break;
          case "LastName":
            if(typeof member.LastName === 'undefined') row.push("");
            else row.push(member.LastName);
            break;
          case "Email":
            if(typeof member.Email === 'undefined') row.push("");
            else row.push(member.Email);
            break;
          case "DisplayName":
            if(typeof member.DisplayName === 'undefined') row.push("");
            else row.push(member.DisplayName);
            break;
          case "Organization":
            if(typeof member.Organization === 'undefined') row.push("");
            row.push(member.Organization);
            break;
          case "MembershipLevelName":
            if(typeof member.MembershipLevel === 'undefined') row.push("No Membership Level");
            else row.push(member.MembershipLevel.Name);
            break;
          case "MembershipLevelId":
            if(typeof member.MembershipLevel === 'undefined') row.push("No Membership Level");
            else row.push(member.MembershipLevel.Id);
            break;
          case "MembershipEnabled":
            row.push(member.MembershipEnabled);
            break;
          case "IsAccountAdministrator":
            if(typeof member.IsAccountAdministrator === 'undefined') row.push("");
            else row.push(member.IsAccountAdministrator);
            break;
          case "Status":
            if(typeof member.MembershipLevel === 'undefined') row.push("Non-member");
            else row.push(member.Status);
            break;
          case "TermsOfUseAccepted":
            if(typeof member.TermsOfUseAccepted === 'undefined') row.push("");
            else row.push(member.TermsOfUseAccepted);
            break;
          case "Active":
            if (member.Status == "Active") row.push(true);
            else row.push(false);
            break;
          case "Lapsed":
            if (member.Status == "Lapsed") row.push(true);
            else row.push(false);
            break;
          case "PendingNew":
            if (member.Status == "PendingNew") row.push(true);
            else row.push(false);
            break;
          case "PendingRenewal":
            if (member.Status == "PendingRenewal") row.push(true);
            else row.push(false);
            break;
          case "isArchived":

            var isArchived = false;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "IsArchived") {
                if (element.Value == true) {
                  isArchived = true;
                }
              }
            });

            row.push(isArchived);
            break;
          case "IsDonor":

            var isDonor = false;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "IsDonor") {
                if (element.Value == true) {
                  isDonor = true;
                }
              }
            });

            row.push(isDonor);
            break;
          case "IsEventAttendee":

            var isEventAttendee = false;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "IsEventAttendee") {
                if (element.Value == true) {
                  isEventAttendee = true;
                }
              }
            });

            row.push(isEventAttendee);
            break;
          case "IsMember":
            var isMember = false;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "IsMember") {
                if (element.Value == true) {
                  isMember = true;
                }
              }
            });

            row.push(isMember);
            break;
          case "IsSuspendedMember":
            var isSuspendedMember = false;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "IsSuspendedMember") {
                if (element.Value == true) {
                  isSuspendedMember = true;
                }
              }
            });

            row.push(isSuspendedMember);
            break;
          case "ReceiveEventReminders":
            var receiveEventReminders = false;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "ReceiveEventReminders") {
                if (element.Value == true) {
                  receiveEventReminders = true;
                }
              }
            });

            row.push(receiveEventReminders);
            break;
          case "ReceiveNewsletters":
            var receiveNL = false;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "ReceiveNewsletters") {
                if (element.Value == true) {
                  receiveNL = true;
                }
              }
            });

            row.push(receiveNL);
            break;
          case "EmailDisabled":
            var emailD = false;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "EmailDisabled") {
                if (element.Value == true) {
                  emailD = true;
                }
              }
            });

            row.push(emailD);
            break;
          case "RecievingEMailsDisabled":
            var recievingEMD = false;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "RecievingEMailsDisabled") {
                if (element.Value == true) {
                  recievingEMD = true;
                }
              }
            });

            row.push(recievingEMD);
            break;
          case "Balance":
            var balance = 0;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "Balance") {
                balance = element.Value;
              }
            });

            row.push(balance);
            break;
          case "TotalDonated":
            var totalD = 0;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "TotalDonated") {
                totalD = element.Value;
              }
            });

            row.push(totalD);
            break;
          case "LastUpdated":
            var lastU = undefined;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "lastUpdated") {
                lastU = element.Value;
              }
            });

            row.push(lastU);
            break;
          case "LastUpdatedBy":
            var lastUB = undefined;

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "LastUpdatedBy") {
                lastUB = element.Value;
              }
            });

            row.push(lastUB);
            break;
          case "CreationDate":
            var creationD = "";

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "CreationDate") {
                creationD = element.Value;
              }
            });

            row.push(creationD);
            break;
          case "LastLoginDate":
            var lastLD = "";

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "LastLoginDate") {
                lastLD = element.Value;
              }
            });

            row.push(lastLD);
            break;
          case "AdminRole":
            var adminR = "Not An Account Administrator";

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "AdminRole") {
                if (element.Value.length != 0) {
                  adminR = "Account Administrator (Full Access)";
                }
              }
            });

            row.push(adminR);
            break;
          case "Notes":
            var notes = "";

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "Notes") {
                notes = element.Value;
              }
            });

            row.push(notes);
            break;
          case "Phone":
            var phone = "";

            member.FieldValues.forEach(function(element) {
              if (element.SystemCode == "Phone") {
                phone = element.Value;
              }
            });

            row.push(phone);
            break;
          default:
            //row.push("");
        }
      });
      rows.push({ values: row }); // final response
    });
  }
  else if(request.configParams.resource == "membershipLevels"){ // Membership Level, To be completed
    var membershipLevelsEndpoint =
      API_PATHS.accounts +
      account.Id +
        "/membershipLevels";
    var membershipLevels = _fetchAPI(membershipLevelsEndpoint, token);
    membershipLevels.forEach(function(memberLevel){
       var row = [];
       selectedDimensionsMetrics.forEach(function(field) {
        switch (field.name) {
          case "Id":
            if(typeof memberLevel.Id === 'undefined') row.push("");
            else row.push(memberLevel.Id);
            break;
          case "Name":
            if(typeof memberLevel.Name === 'undefined') row.push("");
            else row.push(memberLevel.Name);
            break;
          case "MembershipFee":
            if(typeof memberLevel.MembershipFee === 'undefined') row.push("");
            else row.push(memberLevel.MembershipFee);
            break;
          case "Description":
            if(typeof memberLevel.Description === 'undefined') row.push("N/A");
            else row.push(memberLevel.Description);
            break;
          default:
            //row.push("");
        }
      });
      rows.push({ values: row });
    });
  }
  else if(request.configParams.resource == "event"){ // EVENT REGISTRATIONS, To be completed
    var eventsEndpoint =
      API_PATHS.accounts +
      account.Id +
        "/events";
    var events = _fetchAPI(eventsEndpoint, token);
    events.Events.forEach(function(event){
       var row = [];
       selectedDimensionsMetrics.forEach(function(field) {
        switch (field.name) {
          case "Id":
            if(typeof event.Id === 'undefined') row.push("");
            else row.push(event.Id);
            break;
          case "Name":
            if(typeof event.Name === 'undefined') row.push("");
            else row.push(event.Name);
            break;
          case "StartDate":
            if(typeof event.StartDate === 'undefined') row.push("");
            else row.push(event.StartDate);
            break;
          case "EndDate":
            if(typeof event.EndDate === 'undefined') row.push("");
            else row.push(event.EndDate);
            break;
          case "Location":
            if(typeof event.Location === 'undefined') row.push("");
            else row.push(event.Location);
            break;
          case "Tags":
            if(typeof event.Tags === 'undefined' || event.Tags.length == 0 ) {row.push("");}
            else{
            var input = "";
            for(var j in event.Tags){
              if (input == ""){
                input = event.Tags[j]
              }
              else{
                input = input + ", " + event.Tags[j];
              }
            }
            row.push(input);
            }
            break;
          case "PendingRegistrationsCount":
             if(typeof event.PendingRegistrationsCount === 'undefined') row.push("");
            else row.push(event.PendingRegistrationsCount);
             break;
          case "ConfirmedRegistrationsCount":
            if(typeof event.ConfirmedRegistrationsCount === 'undefined') row.push("");
            else row.push(event.ConfirmedRegistrationsCount);
            break;
          case "CheckedInAttendeesNumber":
            if(typeof event.CheckedInAttendeesNumber === 'undefined') row.push("");
            else row.push(event.CheckedInAttendeesNumber);
            break;
          default:
            //row.push("");
        }
      });
      rows.push({ values: row });
    });
  }
  else if(request.configParams.resource == "auditLog"){ // AUDIT LOG, To be completed
     var startDate = request.configParams.auditLogStartDate;
     var endDate = request.configParams.auditLogEndDate;
     var auditLogEndpoint =
      API_PATHS.accounts +
      account.Id +
      "/auditLogItems/?StartDate=" +
      startDate +
      "&EndDate=" +
      endDate;
    var auditLogItems = _fetchAPI(auditLogEndpoint, token);
    auditLogItems.Items.forEach(function(AuditItem){
      var row = [];
      selectedDimensionsMetrics.forEach(function(field) {
        switch(field.name){
          case "ContactId":
            if(typeof AuditItem.Contact === 'undefined') row.push("");
            else row.push(AuditItem.Contact.Id);
            break;
         case "FirstName":
            if(typeof AuditItem.FirstName === 'undefined') row.push("");
            else row.push(AuditItem.FirstName);
            break;
         case "LastName":
            if(typeof AuditItem.LastName === 'undefined') row.push("");
            else row.push(AuditItem.LastName);
            break;
         case "Organization":
            if(typeof AuditItem.Organization === 'undefined' || !AuditItem.Organization) row.push("N/A");
            else row.push(AuditItem.Organization);
            break;
         case "Email":
            if(typeof AuditItem.Email === 'undefined') row.push("");
            else row.push(AuditItem.Email);
            break;
         case "Message":
            if(typeof AuditItem.Message === 'undefined') row.push("");
            else row.push(AuditItem.Message);
            break;
         case "AuditLogId":
            if(typeof AuditItem.Message === 'undefined') row.push("");
            else row.push(AuditItem.Id);
            break;
         default:

        }
      });
      rows.push({ values: row });
    });
  }
  else if(request.configParams.resource == "invoices"){ // INVOICES, To be completed
     var top = request.configParams.invoicesTop;
     var accountsEndpoint =
      API_PATHS.accounts +
      account.Id +
      //"/invoices?unpaidOnly=false&idsOnly=false&StartDate=2005-01-03&EndDate=2030-03-03";
      "/invoices?unpaidOnly=false&idsOnly=false&$top=" +
      top;
    var invoices = _fetchAPI(accountsEndpoint, token);
    invoices.Invoices.forEach(function(invoice){
      var row = [];
      selectedDimensionsMetrics.forEach(function(field) {
        switch(field.name){
         case "Id":
            if(typeof invoice.DocumentNumber === 'undefined') row.push("");
            else row.push(invoice.DocumentNumber);
            break;
         case "Url":
            if(typeof invoice.Url === 'undefined') row.push("");
            else row.push(invoice.Url);
            break;
         case "IsPaid":
            row.push(invoice.IsPaid);
            break;
         case "PaidAmount":
            if(typeof invoice.PaidAmount === 'undefined' || !invoice.PaidAmount) row.push("");
            else row.push(invoice.PaidAmount);
            break;
         case "ContactId":
            if(typeof invoice.Contact === 'undefined') row.push("");
            else row.push(invoice.Contact.Id);
            break;
         case "CreatedDate":
            if(typeof invoice.CreatedDate === 'undefined') row.push("");
            else row.push(invoice.CreatedDate);
            break;
         case "OrderType":
            row.push(invoice.OrderType);
            break;
         case "PublicMemo":
//            var blank = invoice.PublicMemo;
//            if (typeof invoice.PublicMemo === "string") {
//             if (invoice.PublicMemo === "") {
//               blank = null;
//             }
//            }
//            row.push(blank);
            row.push(convertToNullString(invoice.PublicMemo));
            break;
         case "Memo":
            row.push(convertToNullString(invoice.Memo));
            break;
         case "ContactName":
            row.push(invoice.Contact.Name);
            break;
         case "Value":
            row.push(invoice.Value);
            break;
         case "EventId":
            if (invoice.OrderType === "EventRegistration") {
              var eventRegistrationEndpoint =
                  API_PATHS.accounts +
                    account.Id +
                      "/eventregistrations/" +
                        invoice.EventRegistration.Id;
              var eventRegistration = _fetchAPI(eventRegistrationEndpoint, token);
              row.push(eventRegistration.Event.Id);
            }
            else {
              row.push("");
            }
            break;
         default:
        }
      });
      rows.push({ values: row });
    });
  }

  console.info(schema);
  console.info(rows);

  return {
    schema: selectedDimensionsMetrics,
    rows: rows
  };
}

function convertToNullString(string) {
  if (typeof string === "string") {
    if (string === "") {
      string = null;
    }
  }
  return string
};

function _getAccessToken(apikey) {
  var scopeNames = "auto";

  var authRequestParams = {
    method: "POST",
    headers: {
      Authorization: "Basic " + Utilities.base64Encode("APIKEY" + ":" + apikey)
    },
    contentType: "application/x-www-form-urlencoded",
    payload: Utilities.formatString(
      "grant_type=%s&scope=%s",
      "client_credentials",
      scopeNames
    )
  };

  var tokenJSON = UrlFetchApp.fetch(API_PATHS.auth, authRequestParams);
  var tokenData = JSON.parse(tokenJSON);

  return tokenData.access_token;
}

function _fetchAPI(url, token) { // HTTP request
  var requestParams = {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
    accept: "application/json"
  };

  var responseJSON = UrlFetchApp.fetch(url, requestParams); // request Params in order to fetch from API
  return JSON.parse(responseJSON); // returns back from request, parses into Javascript object, ready to be used
  console.log(responseJSON);

}

function _filterSelectedItems(schema, selectedFields) {
  var dimensionsAndMetrics = [];

  selectedFields.forEach(function(field) {
    for (var i = 0; i < schema.length; i++) {
      if (schema[i].name === field.name) {
        dimensionsAndMetrics.push(schema[i]);
        break;
      }
    }
  });

  return dimensionsAndMetrics;
}

////////////////////////// OLD AUTH //////////////////////////////
/*
function getAuthType() {
  var response = {
    type: "OAuth2"
  };
  return response;
}
*/

/////////////////////////// NEW AUTH /////////////////////////////////
/**
 * Gets the OAuth2 Auth type.
 * @return {object} The Auth type.
 */
wa_connector.getAuthType = function() {
  var cc = DataStudioApp.createCommunityConnector();
  return cc.newAuthTypeResponse()
    .setAuthType(cc.AuthType.KEY)
    .setHelpUrl('https://www.example.org/connector-auth-help')
    .build();
}

/**
 * Resets the auth service.
 */
function resetAuth() {
  var userProperties = PropertiesService.getUserProperties();
  userProperties.deleteProperty('dscc.key');
}

/**
 * Returns true if the auth service has access.
 * @return {boolean} True if the auth service has access.
 */
function isAuthValid() {
  var userProperties = PropertiesService.getUserProperties();
  var key = userProperties.getProperty('dscc.key');
  // This assumes you have a validateKey function that can validate if the key is valid.
  //return validateKey(key);
    return true;
}

/**
 * Sets the credentials.
 * @param {Request} request The set credentials request.
 * @return {object} An object with an errorCode.
 */
function setCredentials(request) {
  var key = request.configParams.apikey;

  var userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty('dscc.key', key);
  return {
    errorCode: 'NONE'
  };
}

////////////////////////////////////////////////////////////////////////

function isAdminUser() {
  return true;
}

////////////////////////////////////////////////////////////////////////
// STACKDRIVER LOGGING API CALLS //
////////////////////////////////////////////////////////////////////////

logEnabled = true; // Do you want logging to be enabled?

wa_connector.stackDriverLogging = function(functionName, parameter) {

  if (logEnabled) {
    var paramString = JSON.stringify(parameter, null, 2); // creates a JSON string of the return from API
    console.log([functionName, 'request', paramString]); // logs as a JSON object
  }

  var returnObject = wa_connector[functionName](parameter);

  if (logEnabled) {
    var returnString = JSON.stringify(returnObject, null, 2);
    console.log([functionName, 'response', returnString]);
  }

  return returnObject;
};
