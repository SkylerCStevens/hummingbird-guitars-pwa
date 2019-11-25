const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 5
    },
    password: {
        type: String,
        required: true,
        minlength:  8,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
        trim: true,
    },
});

const saltnum = parseInt(process.env.SALT_WORK_FACTOR)

UserSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(saltnum))
}

UserSchema.methods.validPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

UserSchema.pre('save', function(next) {
    var user = this;

// only hash the password if it has been modified (or is new)
if (!user.isModified('password')) return next();

// generate a salt
bcrypt.genSalt(saltnum, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    })
})
});

const User = mongoose.model("User", UserSchema);

module.exports = User;