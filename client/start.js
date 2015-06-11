Meteor.startup(function() {
    if(Meteor.isClient){
        return SEO.config({
            title: 'Beethub',
            meta: {
              'description': 'A free and open source management system for non-profits'
            }
        });
    }
});