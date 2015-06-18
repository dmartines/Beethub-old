Template.orgs.helpers({
    org:function() {
        return Org.find({},{sort: {createdOn:-1}}).fetch();
    }
});

Template.orgs.events({
    'click #requestAccess': function(e) {
        var text = 'User ' + Meteor.user()._id + " requested access to organization " + this._id;
        $('#warningMessage').text(text);
        $('#warningAlert').slideDown();
    }
});