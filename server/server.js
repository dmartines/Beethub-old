// general server-side code
Meteor.publish('org', function() {
    var orgUsers = OrgUsers.find({userId:this.userId}, {orgId: 1, role: 1}).fetch();
    var orgs = [''];
    for (var org in orgUsers) {
        orgs.push(orgUsers[org].orgId);
    }
    return Org.find({_id: {$in: orgs}});
});

Meteor.publish('orgusers', function() {
    return OrgUsers.find({userId:this.userId}); 
});

Meteor.publish('adminTimesheets', function() {
    var orgUsers = OrgUsers.find({userId:this.userId}, {orgId: 1, role: 1}).fetch();
    var orgs = [''];
    for (var org in orgUsers) {
        orgs.push(orgUsers[org].orgId);
    }
    return Timesheet.find({orgId: {$in: orgs}});
});

Meteor.methods({
    'insertOrganization': function(name, desc, addr1, addr2, city, st, country, phone) {
        if (name == '') {
            Coffee.success("Missing name");
            Router.go('newOrganization');
        }
        var orgId = Org.insert({
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
        });
        if (!orgId)
            throw new Meteor.Error(401,'Organization could not be created');
    
        var userAssigned = OrgUsers.insert({
            orgId: orgId,
            userId: this.userId,
            role: 'admin'
        });
        if (!userAssigned) 
            throw new Meteor.Error(401,'User not assigned to organization. Please contact Administrator');
    }
});