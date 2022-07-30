const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const Restaurent = require('./model/restaurent.js');
const mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);


mongoose.connect('mongodb://localhost:27017/sasi')
    .then(() => {
    console.log("Database Connected");
})
    .catch(err => {
    console.log("Database Not Connected",err.message);
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));


// app.get('/', async(req, res) => {
//     await Restaurent.deleteMany({});
//     const d = new Restaurent({name: 'Sugu',website: 'www.sugus.com',image: 'https://images.unsplash.com/photo-1602520000000-8c8c8c8c8c8c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', number: 1234567890, time: new Date()});
//     await d.save();
//     const data = await Restaurent.find({});
//     res.send(data);
// })

app.get('/', async (req, res) => {
    const data = await Restaurent.find({});
    res.render("index",{ data });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/:id',async (req,res)=>{
    const data = await Restaurent.findById(req.params.id);
    res.render('show',{data});
});




app.listen(3000, () => {
    console.log('App listening on port 3000!');
});