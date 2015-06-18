process.env.MAIL_URL="smtp://xxxx@xxxx.com:xxxx@smtp.xxxx.com:465/";

// general server-side code
Meteor.publish('org', function() {
    return Org.find();
});

Meteor.publish('adminTimesheets', function() {
    /*var orgUsers = OrgUsers.find({userId:this.userId}, {orgId: 1, role: 1}).fetch();
    var orgs = [''];
    for (var org in orgUsers) {
        orgs.push(orgUsers[org].orgId);
    }
    return Timesheet.find({orgId: {$in: orgs}});*/
});

Meteor.methods({
    inviteUser: function (doc) {
        check(doc, InviteSchema);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        SSR.compileTemplate('inviteUsers', Assets.getText('inviteUsers.html'));
        doc.url = 'http://localhost:3000/sign-up'
        var html = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'>"
            + SSR.render('inviteUsers', doc);

        sendEmail({
            to: doc.to,
            subject: "You were invited by Beethub",
            message: '',
            html: html
        });

    }
});

function sendEmail (doc) {
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    if (!doc.subject)
        doc.subject = "You got a message from Beethub";

    Email.send({
        to: doc.to,
        from: 'dbmartines@gmail.com',
        subject: doc.subject,
        message: doc.message,
        html: doc.html
    });

};
