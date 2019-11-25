const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema ({
    message: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 180,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100
    }
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;