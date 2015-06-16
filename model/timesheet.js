// all client + server code goes here!
Timesheet = new Mongo.Collection('timesheet');

TimesheetSchema = new SimpleSchema({
    orgId: {
        type: String,
        label: "Organization Id"
    },
    userId: {
        type: String,
        label: "User Id"
    },
    week: {
        type: String,
        label: "Week"
    },
    sunday: {
        type: String,
        label: "Sunday"
    },
    monday: {
        type: String,   
        label: "Monday"
    },
    tuesday: {
        type: String,
        label: "Tuesday"
    },
    wednesday: {
        type: String,
        label: "Wednesday"
    },
    thursday: {
        type: String,
        label: "Thursday"
    },
    friday: {
        type: String,
        label: "Friday"
    },
    saturday: {
        type: String,
        label: "Saturday"
    }
});
Timesheet.attachSchema(TimesheetSchema);

Timesheet.before.insert(function(userId, doc) {
  doc.createdOn = new Date();
  doc.userId = userId;
});

Timesheet.allow({
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