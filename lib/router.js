// For general client-side JS
// (we will use specific files as needed)

Router.configure({
    layoutTemplate: 'base',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound'
});

Router.plugin('ensureSignedIn', {
    only: ['orgs','orgNew','org']
});

Router.map(function() {
    this.route('home', {
        path: '/',
        onBeforeAction: function() {
            if (Meteor.userId()) {
                Router.go('orgs');
            } else {
                this.next();
            }
        }
    });
    
    this.route('orgNew', {
        path: '/org/new',
    });
    
    this.route('org', {
        path: '/org/:id',
        waitOn: function() {
            return Meteor.subscribe('org');
        },
        data: function () {

            var orgId = this.params.id;
            if (!orgId)
                orgId = Session.get('orgId');
            var myOrg = Org.findOne({_id:orgId});
            if (myOrg) {
                Session.set('orgId',orgId);
                Session.set('orgName',myOrg.name);
                Session.set('orgDescription',myOrg.description);
            }

            return {
                myOrg: myOrg,
            };
        }
    });
    
    this.route('orgs', {
        path: '/orgs',
        waitOn: function() {
            return Meteor.subscribe('org');
        },
        data: function() {
            var myOrg = Org.find({users:{ $elemMatch: {userId: Meteor.userId()}}});
            return {
                myOrgs: myOrg
            };
        }
    });

    this.route('inviteUsers', {
        path: '/org/:id/invite'
    })

    this.route('accessOrganization', {
        path: '/requestaccess'
    })

    this.route('signIn', {
        redirect: function () {
            var user = Meteor.user();
            if (user)
                Router.go('/orgs');
        }
    });
});

Router.onBeforeAction("loading");
