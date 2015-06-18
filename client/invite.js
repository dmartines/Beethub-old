Template.inviteUsers.helpers({
    inviteUserSchema: function() {
        return InviteSchema;
    }
});

Template.inviteUsers.events({
    'click #btnInviteUser': function(e) {
        e.preventDefault();
        var doc = {
            name: $("input[name='name']").val(),
            to: $("input[name='to']").val(),
            message: $("textarea[name='message']").val().replace(/(\r\n?|\n)/g,"<br>")
        };
        check(doc, InviteSchema);
        Meteor.call('inviteUser',doc);

        $('#successMessage').text('Message was sent successfully');
        $('#successAlert').slideDown();
        //CoffeeAlerts.success('Yeah!');
        if (Session.get('orgId')) {
            var route = '/org/' + Session.get('orgId');
            Router.go(route);
        } else {
            Router.go('/orgs');
        }
    },
    'click #btnCancelInvite': function(e) {
        if (Session.get('orgId')) {
            var route = '/org/' + Session.get('orgId');
            Router.go(route);
        } else {
            Router.go('/orgs');
        }
    }
});
