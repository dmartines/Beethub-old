// For general client-side JS
// (we will use specific files as needed)

Router.configure({
    layoutTemplate: 'base',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound'
});

Router.map(function() {
    this.route('home', {
        path: '/',
        waitOn: function() {
            return Meteor.subscribe('org');  
        },
        onBeforeAction: function() {
            if (Meteor.user()) {
                Router.go('orgs');
            }
        }
    });
    
    this.route('orgNew', {
        path: '/organization/new',
    });
    
    this.route('org', {
        path: '/organization/:id',
        waitOn: function() {
            return Meteor.subscribe('myorg');  
        },
        onBeforeAction: function() {
            if (!Meteor.user()) {
                Router.go('signIn');
            }
        }
    })
    
    this.route('orgs');
});

Router.plugin('ensureSignedIn', {
    except: ['home']    
});