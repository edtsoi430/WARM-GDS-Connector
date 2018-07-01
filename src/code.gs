// ---------------------------------------------------------------------------------------------------------------------------------
// Created by Edmond Tsoi @ NewPath Consulting Ltd.
var API_PATHS = {
    auth: "https://oauth.wildapricot.org/auth/token",
    accounts: "https://api.wildapricot.org/v2/accounts/"
  };
  // Customized schema for Wild Apricot
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
      { // define more schema
        name: "TermsOfUseAccepted",
        label: "TermsOfUseAccepted",
        dataType: "BOOLEAN",
        semantics: {
          conceptType: "DIMENSION",
          semanticType: "BOOLEAN"
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
        helpText: "Please Enter your API Key",
        placeholder: "30 chars..."
      },
      {
        name: "resource",
        type: "SELECT_SINGLE",
        displayName: "Select Data Type",
        helpText: "The connector will retrieve data for the selected type.",
        options: [ // Allow users to select two of the following options for different data
          {
            label: "Account",
            value: "account"
          },
          {
            label: "Members",
            value: "members"
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

// Get data from wild apricot according to the customized schema
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
  } else if (request.configParams.resource == "members") {
    var accountsEndpoint =
      API_PATHS.accounts +
      account.Id +
        "/Contacts?$async=false&$select='Status";
    //  "/Contacts?$async=false&$select='Status";

    var members = _fetchAPI(accountsEndpoint, token);

    members.Contacts.forEach(function(member) {
      var row = [];
      selectedDimensionsMetrics.forEach(function(field) {
        switch (field.name) {
          case "Id":
            row.push(member.Id);
            break;
          case "FirstName":
            row.push(member.FirstName);
            break;
          case "LastName":
            row.push(member.LastName);
            break;
          case "Email":
            row.push(member.Email);
            break;
          case "DisplayName":
            row.push(member.DisplayName);
            break;
          case "Organization":
            row.push(member.Organization);
            break;
          case "MembershipLevel":
            if (member.MembershipLevel) row.push(member.MembershipLevel.Name);
            else row.push("");
            break;
          case "MembershipEnabled":
            row.push(member.MembershipEnabled);
            break;
          case "IsAccountAdministrator":
            row.push(member.IsAccountAdministrator);
            break;
          case "Status":
            row.push(member.Status);
            break;
          case "TermsOfUseAccepted":
            row.push(member.TermsOfUseAccepted);
            break;
          default:
            //row.push("");
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
// For Admin User
function isAdminUser() {
  return true;
}
