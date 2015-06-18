Template.jumbotron.helpers({
    myOrg: function() {
        return {
            name: Session.get("orgName"),
            description: Session.get("orgDescription")
        };
    }
});