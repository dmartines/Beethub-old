// For general client-side JS
// (we will use specific files as needed)
Meteor.subscribe('org');
Meteor.subscribe('orgusers');
Meteor.subscribe('orgAdded');

Router.configure({
    layoutTemplate: 'main'
});

Router.route('/org/:_id', function () {
  this.response.end('hi from the server\n', this.params._id);
});