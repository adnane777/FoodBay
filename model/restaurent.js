const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    email:{
        type: String,
    },
    image: {
        type: String
    },location: {
        type: String
    },
    time: { type: String },
    seats: { type: Number },
    description: { type: String }
})


module.exports = mongoose.model('Restaurent', RestaurentSchema);