const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RestaurentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    }
})


module.exports = mongoose.model('Restaurent',RestaurentSchema);