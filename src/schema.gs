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

var WASchema = {
  // Account
  account: [
    {
      name: "Id",
      label: "Account Number",
      dataType: "NUMBER",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "PrimaryDomainName",
      label: "Account Domain",
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
      name: "MembershipLevelName",
      label: "Membership Level Name",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "MembershipLevelId",
      label: "Membership Level Id",
      dataType: "NUMBER",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "MembershipEnabled",
      label: "Membership Enabled",
      dataType: "BOOLEAN",
      semantics: {
        conceptType: "METRIC",
        semanticType: "BOOLEAN"
      }
    },
    {
      name: "IsAccountAdministrator",
      label: "Admin",
      dataType: "BOOLEAN",
      semantics: {
        conceptType: "METRIC",
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
    },
    {
      name: "isArchived",
      label: "isArchived",
      dataType: "BOOLEAN",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "BOOLEAN"
      }
    },
    {
      name: "IsDonor", // corresponds to code in getData
      label: "Donor", // this is how it appears in GDS
      dataType: "BOOLEAN",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "BOOLEAN"
      }
    },
    {
      name: "IsEventAttendee",
      label: "Event registrant",
      dataType: "BOOLEAN",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "BOOLEAN"
      }
    },
    {
      name: "IsMember",
      label: "Member",
      dataType: "BOOLEAN",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "BOOLEAN"
      }
    },
    {
      name: "IsSuspendedMember",
      label: "Suspended member",
      dataType: "BOOLEAN",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "BOOLEAN"
      }
    },
    {
      name: "ReceiveEventReminders",
      label: "Event announcements",
      dataType: "BOOLEAN",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "BOOLEAN"
      }
    },
    {
      name: "ReceiveNewsletters",
      label: "Member emails and newsletters",
      dataType: "BOOLEAN",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "BOOLEAN"
      }
    },
    {
      name: "EmailDisabled",
      label: "Email delivery disabled",
      dataType: "BOOLEAN",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "BOOLEAN"
      }
    },
    {
      name: "RecievingEMailsDisabled",
      label: "Receiving emails disabled",
      dataType: "BOOLEAN",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "BOOLEAN"
      }
    },
    {
      name: "Balance",
      label: "Balance",
      dataType: "NUMBER",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "TotalDonated",
      label: "Total donated",
      dataType: "NUMBER",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "LastUpdated",
      label: "Profile last updated",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION",
        semanticGroup: "DATE_AND_TIME",
        semanticType: "YEAR_MONTH_DAY_HOUR"
      }
    },
    {
      name: "LastUpdatedBy",
      label: "Profile last updated by",
      dataType: "NUMBER",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "CreationDate",
      label: "Creation date",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "YEAR_MONTH_DAY_HOUR"
      }
    },
    {
      name: "LastLoginDate",
      label: "Last login date",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION",
        semanticGroup: "DATE_AND_TIME",
        semanticType: "YEAR_MONTH_DAY_HOUR"
      }
    },
    {
      name: "AdminRole",
      label: "Administrator role",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "Notes",
      label: "Notes",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "Phone",
      label: "Phone",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION"
      }
    }
  ],

  // Membership Levels Endpoint
  membershipLevels: [
    {
      name: "Id",
      label: "Membership Level Id",
      dataType: "NUMBER",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "Name",
      label: "Membership Level Name",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "TEXT"
      }
    },
    {
      name: "MembershipFee",
      label: "Membership Fee",
      dataType: "NUMBER",
      semantics: {
        conceptType: "METRIC",
        semanticGroup: "CURRENCY",
        semanticType: "CURRENCY_CAD"
      }
    },
    {
      name: "Description",
      label: "Level Description",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION",
        semanticType: "TEXT"
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
        conceptType: "DIMENSION",
        semanticGroup: "DATE_AND_TIME",
        semanticType: "YEAR_MONTH_DAY_HOUR"
      }
    },
    {
      name: "EndDate",
      label: "End Date",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION",
        semanticGroup: "DATE_AND_TIME",
        semanticType: "YEAR_MONTH_DAY_HOUR"
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
        conceptType: "METRIC"
      }
    },
    {
      name: "ConfirmedRegistrationsCount",
      label: "Number of Confirmed Registrations",
      dataType: "NUMBER",
      semantics: {
        conceptType: "METRIC"
      }
    },
    {
      name: "CheckedInAttendeesNumber",
      label: "Number of checked-in attendees",
      dataType: "NUMBER",
      semantics: {
        conceptType: "METRIC"
      }
    }
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
    },
    {
      name: "AuditLogId",
      label: "Audit Log Id",
      dataType: "NUMBER",
      semantics: {
        conceptType: "DIMENSION"
      }
    }
  ],
  // INVOICES
  invoices: [
    {
      name: "Id",
      label: "Invoice Number",
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
    {
      name: "CreatedDate",
      label: "Invoice Created Date",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION",
        semanticGroup: "DATE_AND_TIME",
        semanticType: "YEAR_MONTH_DAY_HOUR"
      }
    },
    {
      name: "OrderType",
      label: "Origin",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "PublicMemo",
      label: "Comments for payer",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "Memo",
      label: "Internal notes",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "ContactName",
      label: "Invoiced to",
      dataType: "STRING",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "Value",
      label: "Total Amount",
      dataType: "NUMBER",
      semantics: {
        conceptType: "DIMENSION"
      }
    },
    {
      name: "EventId",
      label: "Event ID",
      dataType: "NUMBER",
      semantics: {
        conceptType: "DIMENSION"
      }
    }
  ]
};
