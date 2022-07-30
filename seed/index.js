const mongoose = require('mongoose');
const hotel = require('./hotel.js');
const Restaurent = require('../model/restaurent.js');

const {randomBytes} = require('node:crypto')

mongoose.connect('mongodb://localhost:27017/sasi').then(() => {
    console.log("console to DB");
}).catch(err => {
    console.log("Error:",err.message);
})

const seedRestaurents = async ()=>{
    await Restaurent.deleteMany({});
    for (let restaurent of hotel){
        let newRestaurent = new Restaurent({
            _id:randomBytes(16).toString('hex').slice(0,24),
            name: restaurent.name,
            number: restaurent.number
        })
        let data = await newRestaurent.save();
        console.log(data);
    }
}

seedRestaurents();