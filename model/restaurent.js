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
        required: true
    },
    image: {
        type: String
    },location: {
        type: String
    },
    time: { type: String },
    seats: { type: Number, required: true },
    description: { type: String },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})


module.exports = mongoose.model('Restaurent', RestaurentSchema);