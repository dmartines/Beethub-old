Template.functions.helpers({
    org:function() {
        return Org.find({},{sort: {createdOn:-1}}).fetch();
    },
    orgs: function() {
        return OrgUsers.find().fetch();
    },
    userLogged: function() {
        return (Meteor.userId() != undefined ? true : false);
    },
    orgAdded: function() {
        return Meteor.subscribe('orgAdded');    
    },
    orgFound: function() {
        if (Org.find().fetch().length == 0) 
            return false;
        else
            return true;
    }
});

Template.functions.events({
    'click #btnAddCompany': function(e) {
        $('#btnAddCompany').hide();
        $('#newOrganization').show();
        $("#orgCountry option[value='USA']").attr("selected", "selected");
    },
    'blur #orgName': function(e) {
        if ($('#orgName').val() == "" ) {
            $('#nameControl').addClass('has-error');
            $('#nameControl').removeClass('has-success');
            $('#missingName').show();
        } else {
            $('#nameControl').addClass('has-success');
            $('#nameControl').removeClass('has-error');
            $('#missingName').hide();
            validateAll();
        }
    },
    'blur #orgAddress1': function(e) {
        if ($('#orgAddress1').val() == "" ) {
            $('#addressControl').addClass('has-error');
            $('#addressControl').removeClass('has-success');
            $('#missingAddress').show();
        } else {
            $('#addressControl').addClass('has-success');
            $('#addressControl').removeClass('has-error');
            $('#missingAddress').hide();
            validateAll();
        }
    },
    'blur #orgCity': function(e) {
        if ($('#orgCity').val() == "" ) {
            $('#cityControl').addClass('has-error');
            $('#cityControl').removeClass('has-success');
            $('#missingCity').show();
        } else {
            $('#cityControl').addClass('has-success');
            $('#cityControl').removeClass('has-error');
            $('#missingCity').hide();
            validateAll();
        }
    },
    'click #btnSaveCompany': function() {
        Meteor.call('insertOrganization', 
                    $('#orgName').val(), 
                    $('#orgDescription').val(),
                    $('#orgAddress1').val(),
                    $('#orgAddress2').val(),
                    $('#orgCity').val(),
                    $('#orgState').val(),
                    $('#orgCountry').val(),
                    $('#orgPhone').val(), function(err, results) {
            
            if (err) {
                console.log(err);
                $('#errorOrganization').modal('show');
            } else {
                $('#successOrganization').modal('show');
            }
        });
        
    }

})

function validateAll() {
    if ($('#orgName').val() != "" &&
        $('#orgAddress1').val() != "" &&
        $('#orgCity').val() != "" &&
        $('#orgState').val() != "") {
        $('#btnSaveCompany').addClass("btn-primary");
        $('#btnSaveCompany').removeClass("btn-disabled");
        $('#btnSaveCompany').prop("disabled",false);
    }
}
