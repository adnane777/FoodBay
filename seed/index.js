const mongoose = require('mongoose');
const hotel = require('./hotel.js');
const Restaurent = require('../model/restaurent.js');
const {randomUUID} = require('crypto');

mongoose.connect('mongodb://localhost:27017/soman').then(() => {
    console.log("console to DB");
}).catch(err => {
    console.log("Error:",err.message);
})

const seedRestaurents = async ()=>{
    await Restaurent.deleteMany({});
    for (let restaurent of hotel){
        let newRestaurent = new Restaurent({
            name: restaurent.name,
            number: restaurent.number,
            website: restaurent.website,
            time: restaurent.time,
            image: restaurent.image,
            description: restaurent.description,
            seats: restaurent.seats,
            email: restaurent.email,
            location: restaurent.location
        })
        newRestaurent.owner = '62ebd1933f6e5e4d9a22757b';
        let data = await newRestaurent.save();
        console.log(data);
    }
}

seedRestaurents();