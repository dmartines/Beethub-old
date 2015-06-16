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
            var myOrg = Org.findOne({_id:this.params.id});
            if (!myOrg) {
                CoffeeAlerts.error('Organization not found');
                Router.go('orgs');
                return false;
            }
            return {
                myOrg: myOrg
            };
        }
    });
    
    this.route('orgs', {
        path: '/orgs',
        waitOn: function() {
            return Meteor.subscribe('org');
        }
    });

    this.route('signIn', {
        redirect: function () {
            var user = Meteor.user();
            if (user)
                Router.go('/orgs');
        }
    });
});

Router.onBeforeAction("loading");

/* Router.onBeforeAction(function() {
    if (!Meteor.userId()) {
        Router.go('home');
    } else {
        this.next();
    }
}); */


