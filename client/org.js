Template.org.onRendered(function() {
    Session.set('currentWeek', thisWeekDays(null));
    Session.set('currentDay', moment().dayOfYear());
});

Template.org.helpers({
    editing: function() {
        return Session.equals('currentOrgEdit', Session.get('orgId'));
    }
});

Template.org.events({
    'click #prevweek': function(e) {
        var week = Session.get('currentWeek');
        var day = Session.get('currentDay');
        day = day - 7;
        Session.set('currentWeek', thisWeekDays(day));
        Session.set('currentDay', day);
    },
    'click #nextweek': function(e) {
        var week = Session.get('currentWeek');
        var day = Session.get('currentDay');
        day = day + 7;
        Session.set('currentWeek', thisWeekDays(day));
        Session.set('currentDay', day);
    },
    'click #btnInviteUsers': function(e) {
        var url = window.location.pathname + '/invite';
        Router.go(url);
    },
    'click #btnEditCompany': function(e) {
        e.preventDefault();
        Session.set('currentOrgEdit', Session.get('orgId'));
    },
    'click #btnSubmitOrgEditUser': function(e) {
        e.preventDefault();
        var update = {
            name: $("input[name='name']").val(),
            description: $("textarea[name='description']").val(),
            address1: $("input[name='address1']").val(),
            address2: $("input[name='address2']").val(),
            city: $("input[name='city']").val(),
            state: $("input[name='state']").val(),
            zip: $("input[name='zip']").val()
        }
        Org.update({_id:Session.get('orgId')},{$set:update});
        Session.set('orgName',update.name);
        Session.set('orgDescription',update.description);
        Session.set('currentOrgEdit',null);
    },
    'click #btnCancelOrgEditUser': function(e) {
        e.preventDefault();
        Session.set('currentOrgEdit',null);
    }
});

function thisWeekDays(day) {
    var format = 'MM/DD';
    var dayOfWeek = moment().weekday();
    var today = moment();
    if (day)
        today = moment().dayOfYear(day);
    var sunday = today.subtract(dayOfWeek, 'days');
    return [
        sunday.format(format),
        sunday.add(1, 'days').format(format),
        sunday.add(1, 'days').format(format),
        sunday.add(1, 'days').format(format),
        sunday.add(1, 'days').format(format),
        sunday.add(1, 'days').format(format),
        sunday.add(1, 'days').format(format)
    ]
}