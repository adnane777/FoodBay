const mongoose = require(mongoose);
const Schema = mongoose.Schema;

// const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
    // address: {
    //     type: String,
    //     required: true
    // }
})

module.exports = mongoose.model('User', UserSchema);