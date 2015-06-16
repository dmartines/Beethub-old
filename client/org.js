Template.org.onRendered(function() {
    Session.set('currentWeek', thisWeekDays(null));
    Session.set('currentDay', moment().dayOfYear());
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