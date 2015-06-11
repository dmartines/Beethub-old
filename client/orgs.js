Template.orgs.helpers({
    org:function() {
        return Org.find({},{sort: {createdOn:-1}}).fetch();
    },
    editing: function() {
        return Session.equals('currentOrgEdit', this._id)
    }
});

Template.orgs.events({
    'click .name': function(e) {
        Session.set('currentOrgEdit', this._id);
    },
    'keyup .editing': function(e) {
        if (e.keyCode==27) {
            Session.set('currentOrgEdit',null);
        }
        if (e.keyCode!=13)
            return;
        
        Org.update({_id:this._id},{$set: {name: e.currentTarget.value}});
        Session.set('currentOrgEdit',null);
    }
})