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
    });
    this.route('newOrganization', {
        path: '/organization/new',
    });
    
    this.route('private');
});

Router.plugin('ensureSignedIn', {
    only: ['newOrganization','private']    
});