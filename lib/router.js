// For general client-side JS
// (we will use specific files as needed)
// Meteor.subscribe('org');
// Meteor.subscribe('orgusers');
// Meteor.subscribe('orgAdded');

Router.configure({
  layoutTemplate: 'main'
});

Router.route('/organization/new', {
  // add the subscription handle to our waitlist
  // this.wait(Meteor.subscribe('item', this.params._id));

  // this.ready() is true if all items in the wait list are ready

  template: 'newOrganization'
});
