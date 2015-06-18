/**
 * Created by Daniel on 6/16/2015.
 */

UI.registerHelper("thisWeek", function() {
    return Session.get("currentWeek");
});

UI.registerHelper("orgId", function() {
    return Session.get("orgId");
});

UI.registerHelper("orgName", function() {
    return Session.get("orgName");
});

UI.registerHelper("shortDescription", function(str) {
    if (str.length > 100)
        return str.substring(0,100) + '...';

    return str;
});
