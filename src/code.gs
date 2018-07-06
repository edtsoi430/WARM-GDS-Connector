// ---------------------------------------------------------------------------------------------------------------------------------
// Created by Edmond Tsoi @ NewPath Consulting Inc.
// ADD GPL license
var API_PATHS = {
    auth: "https://oauth.wildapricot.org/auth/token",
    accounts: "https://api.wildapricot.org/v2/accounts/"
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
      },
      {
        name: "Document",
        label: "Invoice ID", // rename it as Invoice ID to allow user to interpret that more easily
        dataType: "NUMBER",
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
    var accountsEndpoint =
      API_PATHS.accounts +
      account.Id +
        "/Contacts?$async=false&$select='Status";
    var members = _fetchAPI(accountsEndpoint, token);
    
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
     var accountsEndpoint =
      API_PATHS.accounts +
      account.Id +
        "/events";
    var events = _fetchAPI(accountsEndpoint, token);
    events.Events.forEach(function(event){
       var row = [];
       selectedDimensionsMetrics.forEach(function(field) {
        switch (field.name) {
          case "Id":
            if(typeof event.Id === 'undefined') row.push("");
            else row.push(event.Id);
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
     var accountsEndpoint =
      API_PATHS.accounts +
      account.Id +
        "/auditLogItems/?StartDate=2017/03/02&EndDate=2018-03-03" ;
    var auditLogItems = _fetchAPI(accountsEndpoint, token);
    auditLogItems.Items.ForEach(function(item){
      var row = [];
      selectedDimesnionsMetrics.forEach(function(field) {
        switch(field.name){
          case "Id":
            if(typeof item.Id === 'undefined') row.push("");
            else row.push(item.id);
            break;
         case "FirstName":
            if(typeof item.FirstName === 'undefined') row.push("");
            else row.push(item.FirstName);
            break;
         case "LastName":
            if(typeof item.LastName === 'undefined') row.push("");
            else row.push(item.LastName);
            break;
         case "Organization":
            if(typeof item.Organization === 'undefined') row.push("");
            else row.push(item.Organization);
            break;
         case "Email":
            if(typeof item.Email === 'undefined') row.push("");
            else row.push(item.Email);
            break;
         case "Message":
            if(typeof item.Message === 'undefined') row.push("");
            else row.push(item.Message);
            break;
         case "Document":
            if(typeof item.Document === 'undefined') row.push("");
            else row.push(item.Document.id);
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

function getAuthType() {
  var response = {
    type: "OAuth2"
  };
  return response;
}

function isAdminUser() {
  return true;
}
