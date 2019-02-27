// ------------------------------------------------------------------------------------------------------------------
// Originally created by Edmond Tsoi for NewPath Consulting Inc.
// Maintained by Lon Motero for NewPath Consulting Inc.
// Licenced under GPL 3.0 license

var API_PATHS = {
    auth: "https://oauth.wildapricot.org/auth/token",
    accounts: "https://api.wildapricot.org/v2.1/accounts/"
  };
  
  var WASchema = {
    account: [
      {
        name: "Id",
        label: "Account ID",
        dataType: "NUMBER",
        semantics: {
          conceptType: "METRIC"
        }
      },
      {
        name: "PrimaryDomainName",
        label: "Account Domain Name",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "URL"
        }
      }
    ],
    // Members
    members: [
      {
        name: "Id",
        label: "Member ID",
        dataType: "NUMBER",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "FirstName",
        label: "First Name",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "TEXT"
        }
      },
      {
        name: "LastName",
        label: "Last Name",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "TEXT"
        }
      },
      {
        name: "Email",
        label: "Email",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "TEXT"
        }
      },
      {
        name: "DisplayName",
        label: "Display Name",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "Organization",
        label: "Organization",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "MembershipLevel",
        label: "Membership Level",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "MembershipEnabled",
        label: "Membership Enabled",
        dataType: "BOOLEAN",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "BOOLEAN"
        }
      },
      {
        name: "IsAccountAdministrator",
        label: "Admin",
        dataType: "BOOLEAN",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "BOOLEAN"
        }
      },
      {
        name: "Status",
        label: "Status",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "TEXT"
        }
      },
      {
        name: "TermsOfUseAccepted",
        label: "TermsOfUseAccepted",
        dataType: "BOOLEAN",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "BOOLEAN"
        }
      },
      { // define more schema depending on usage
        name: "Active",
        label: "IsActiveMember",
        dataType: "BOOLEAN",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "BOOLEAN"
        }
      },
     {
        name: "Lapsed",
        label: "IsLapsedMember",
        dataType: "BOOLEAN",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "BOOLEAN"
        }
      },
      {
        name: "PendingNew",
        label: "IsPendingNewMember",
        dataType: "BOOLEAN",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "BOOLEAN"
        }
      },
      {
        name: "PendingRenewal",
        label: "IsPendingRenewalMember",
        dataType: "BOOLEAN",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "BOOLEAN"
        }
      }
    ],
    // Event
    event: [
      {
        name: "Id",
        label: "Event ID",
        dataType: "NUMBER",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "Name",
        label: "Event Name",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "StartDate",
        label: "Start Date",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION"       
        }
      },
      {
        name: "EndDate",
        label: "End Date",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "Location",
        label: "Event Location",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "Tags",
        label: "Event Tags",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "PendingRegistrationsCount",
        label: "Number of Pending Registrations",
        dataType: "NUMBER",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "ConfirmedRegistrationsCount",
        label: "Number of Confirmed Registrations",
        dataType: "NUMBER",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "CheckedInAttendeesNumber",
        label: "Number of checked-in attendees",
        dataType: "NUMBER",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
    ],
      // AuditLog
     auditLog: [
      {
        name: "ContactId",
        label: "Contact ID",
        dataType: "NUMBER",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "FirstName",
        label: "First Name",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "TEXT"
        }
      },
      {
        name: "LastName",
        label: "Last Name",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "TEXT"
        }
      },
      {
        name: "Organization",
        label: "Organization",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "Email",
        label: "Email",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "TEXT"
        }
      },
      {
        name: "Message",
        label: "Message",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION"
        }
      }
//      {
//        name: "InvoiceId",
//        label: "Invoice Id", // doing multiple calls, can be fixed in a more elegant way
//        dataType: "NUMBER",
//        semantics: {
//          conceptType: "DIMENSION"
//        }
//      }
    ],
    // INVOICES
    invoices: [
      {
        name: "Id",
        label: "Invoice ID",
        dataType: "NUMBER",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "Url",
        label: "Invoice Url",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "TEXT"
        }
      },
      {
        name: "IsPaid",
        label: "Paid",
        dataType: "BOOLEAN",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "BOOLEAN"
        }
      },
      {
        name: "PaidAmount",
        label: "Paid Amount",
        dataType: "NUMBER",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
      {
        name: "ContactId",
        label: "Contact Id",
        dataType: "NUMBER",
        semantics: {
          conceptType: "DIMENSION"
        }
      },
//      {
//        name: "EventRegistrationID",
//        label: "Event Registration ID", // rename it as Invoice ID to allow user to interpret that more easily
//        dataType: "NUMBER",
//        semantics: {
//          conceptType: "DIMENSION"
//        }
//      }
      {
        name: "CreatedDate",
        label: "Invoice Created Date",
        dataType: "STRING",
        semantics: {
          conceptType: "DIMENSION"
        }
      }
      
    ]
  };

function getConfig(request) {
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
      }
    ]
  };
  return config;
}

function getSchema(request) {
  return { schema: WASchema[request.configParams.resource] };
}

function getData(request) {
  var schema = WASchema[request.configParams.resource];

  var selectedDimensionsMetrics = _filterSelectedItems(schema, request.fields);

  var token = _getAccessToken(request.configParams.apikey);
  var account = _fetchAPI(API_PATHS.accounts, token)[0];

  var rows = [];

  if (request.configParams.resource == "account") {
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
  } else if (request.configParams.resource == "members") { // MEMBER
    var membersEndpoint =
      API_PATHS.accounts +
      account.Id +
        "/Contacts?$async=false&$select='Status";
    var members = _fetchAPI(membersEndpoint, token);
    
    members.Contacts.forEach(function(member) {
      var row = [];
      selectedDimensionsMetrics.forEach(function(field) {
        switch (field.name) {
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
          case "MembershipLevel":
            if(typeof member.MembershipLevel === 'undefined') row.push("N/A");
            else row.push(member.MembershipLevel.Name);
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
     var auditLogEndpoint =
      API_PATHS.accounts +
      account.Id +
        "/auditLogItems/?StartDate=2017/03/02&EndDate=2018-03-03" ;
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
//         case "Invoice ID": // Invoice ID, to be finished (debug)
//            if(typeof AuditItem.Document === 'undefined' || !AuditItem.Document) row.push("");
//            else{
//              row.push(AuditItem.Document.Id);
////               var AuditSpecificEndPoint =  API_PATHS.accounts +
////                                            account.Id + "/auditLogItems/" + AuditItem.Id;
////                var specificAudit = _fetchAPI(AuditSpeificEndpoint, token);
////                if(typeof specificAudit.Document === 'undefined' || !specificAudit.Document) row.push("");
////                else row.push(specificAudit.Document.Id);
//            }
//            break;
//          default:
        }
      });
      rows.push({ values: row });
    });                               
  }
  else if(request.configParams.resource == "invoices"){ // INVOICES, To be completed
     var accountsEndpoint =
      API_PATHS.accounts +
      account.Id +
        "/invoices?unpaidOnly=false&idsOnly=false&StartDate=2018-01-03&EndDate=2019-03-03";
    var invoices = _fetchAPI(accountsEndpoint, token);
    invoices.Invoices.forEach(function(invoice){
      var row = [];
      selectedDimensionsMetrics.forEach(function(field) {
        switch(field.name){
          case "Id":
            if(typeof invoice.Id === 'undefined') row.push("");
            else row.push(invoice.Id);
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
          default:
        }
      });
      rows.push({ values: row });
    });                               
  }
  return {
    schema: selectedDimensionsMetrics,
    rows: rows
  };
}

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

function _fetchAPI(url, token) {
  var requestParams = {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
    accept: "application/json"
  };

  var responseJSON = UrlFetchApp.fetch(url, requestParams);

  return JSON.parse(responseJSON);
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
function getAuthType() {
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
