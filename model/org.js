// all client + server code goes here!
Org = new Mongo.Collection('org');
Org.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    description: {
        type: String,
        label: "Description"
    },
    address1: {
        type: String,
        label: "Address 1"
    },
    address2: {
        type: String,
        label: "Address 2"
    },
    city: {
        type: String,
        label: "City"
    },
    state: {
        type: String,
        label: "State"
    },
    country: {
        type: String,
        label: "Country"
    },
    phone: {
        type: String,
        label: "Phone"
    }

}));

Org.before.insert(function(userId, doc) {
  doc.createdOn = new Date();
  doc.userId = userId;
});

Org.after.insert(function(userId, doc) {
    CoffeeAlerts.success("Organization ", this._id, " was created successfully");
    Router.go('/organization/',this._id);
});


/* 
name: name,
            description: desc,
            address1: addr1,
            address2: addr2,
            city: city,
            state: st,
            country: country,
            phone: phone,
            createdBy: this.userId,
            createdOn: new Date()
*/


