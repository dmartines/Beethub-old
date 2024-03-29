// all client + server code goes here!
Org = new Mongo.Collection('org');

Org.initEasySearch(['name','description','city','state']);

OrgSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    description: {
        type: String,
        label: "Description",
        max: 2000,
        autoform: {
            rows: 5
        }
    },
    address1: {
        type: String,
        label: "Address 1"
    },
    address2: {
        type: String,
        label: "Address 2",
        optional: true
    },
    city: {
        type: String,
        label: "City"
    },
    state: {
        type: String,
        label: "State",
        max: 2,
        //allowedValues: ['AK', 'MA', 'NY'],
        autoform: {
            options: [
                {label: "Alabama", value: "AL" },
                {label: "Alaska",value: "AK"},
                {label: "American Samoa", value: "AS"},
                {label: "Arizona",value: "AZ"},
                {label: "Arkansas",value: "AR"},
                {label: "California",value: "CA"},
                {label: "Colorado",value: "CO"},
                {label: "Connecticut",value: "CT"},
                {label: "Delaware",value: "DE"},
                {label: "District Of Columbia",value: "DC"},
                {label: "Federated States Of Micronesia",value: "FM"},
                {label: "Florida",value: "FL"},
                {label: "Georgia",value: "GA"},
                {label: "Guam",value: "GU"},
                {label: "Hawaii",value: "HI"},
                {label: "Idaho",value: "ID"},
                {label: "Illinois",value: "IL"},
                {label: "Indiana",value: "IN"},
                {label: "Iowa",value: "IA"},
                {label: "Kansas",value: "KS"},
                {label: "Kentucky",value: "KY"},
                {label: "Louisiana",value: "LA"},
                {label: "Maine",value: "ME"},
                {label: "Marshall Islands",value: "MH"},
                {label: "Maryland",value: "MD"},
                {label: "Massachusetts",value: "MA"},
                {label: "Michigan",value: "MI"},
                {label: "Minnesota",value: "MN"},
                {label: "Mississippi",value: "MS"},
                {label: "Missouri",value: "MO"},
                {label: "Montana",value: "MT"},
                {label: "Nebraska",value: "NE"},
                {label: "Nevada",value: "NV"},
                {label: "New Hampshire",value: "NH"},
                {label: "New Jersey",value: "NJ"},
                {label: "New Mexico",value: "NM"},
                {label: "New York",value: "NY"},
                {label: "North Carolina",value: "NC"},
                {label: "North Dakota",value: "ND"},
                {label: "Northern Mariana Islands",value: "MP"},
                {label: "Ohio",value: "OH"},
                {label: "Oklahoma",value: "OK"},
                {label: "Oregon",value: "OR"},
                {label: "Palau",value: "PW"},
                {label: "Pennsylvania",value: "PA"},
                {label: "Puerto Rico",value: "PR"},
                {label: "Rhode Island",value: "RI"},
                {label: "South Carolina",value: "SC"},
                {label: "South Dakota",value: "SD"},
                {label: "Tennessee",value: "TN"},
                {label: "Texas",value: "TX"},
                {label: "Utah",value: "UT"},
                {label: "Vermont",value: "VT"},
                {label: "Virgin Islands",value: "VI"},
                {label: "Virginia",value: "VA"},
                {label: "Washington",value: "WA"},
                {label: "West Virginia",value: "WV"},
                {label: "Wisconsin",value: "WI"},
                {label: "Wyoming",value: "WY"}
            ]
        }
    },
    zip: {
        type: String,
        label: "Zip cde",
        max: 9
    },
    country: {
        type: String,
        label: "Country",
        defaultValue: "USA"
    },
    phone: {
        type: String,
        label: "Phone",
        optional: true
    },
    users: {
        type: [Object],
        label: 'Users'
    },
    "users.$.userId": {
        type: String
    },
    "users.$.role": {
        type: String
    }

});
Org.attachSchema(OrgSchema);

Org.before.insert(function(userId, doc) {
  doc.createdOn = new Date();
  doc.userId = userId;
});

Org.after.insert(function(userId, doc) {
    Org.update({_id:doc._id},{$set:{users:{userId: userId, role: 'admin'}}});
    var successMessage = "Organization " + this._id + " was created successfully";
    $('#successMessage').text(successMessage);
    $('#successAlert').slideDown();
    Router.go('/orgs');
});

Org.allow({
  insert: function(userId, doc) {
    return userId;
  },
  update: function(userId, doc, fields, modifier) {
    return userId;
  },
  remove: function(userId, doc) {
    return false;
  }
});