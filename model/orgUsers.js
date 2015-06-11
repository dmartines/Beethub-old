OrgUsers = new Mongo.Collection('orgusers');

OrgUsers.allow({
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