InviteSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        max: 200
    },
    to: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: 'Email',
        max: 200
    },
    from: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: 'Email from',
        max: 200,
        optional: true
    },
    message: {
        type: String,
        label: 'Message',
        max: 2000,
        autoform: {
            rows: 10
        }
    }
});