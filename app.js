const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const Restaurent = require('./model/restaurent.js');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session'); 
const methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);


mongoose.connect('mongodb://localhost:27017/soman')
    .then(() => {
    console.log("Database Connected");
})
    .catch(err => {
    console.log("Database Not Connected",err.message);
});


const sessionConfig = {
    secret: 'howudoing!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}




app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(session(sessionConfig));
app.use(flash());


app.use(
    (req, res, next) => {
    res.locals.success = req.flash('success'),
    res.locals.error = req.flash('error')
    next();
    }
)


app.use(methodOverride('_method'));




app.get('/restaurent/:id/edit', async (req, res) => {
    const {id} = req.params;
    if(mongoose.Types.ObjectId.isValid(id)){
    const restaurent = await Restaurent.findById(id);
    res.render('editRestaurant', {restaurent});
    // console.log(restaurent);
    }
})
app.put('/restaurent/:id', async (req, res) => {
    const {id} = req.params;
    if(mongoose.Types.ObjectId.isValid(id)){
    console.log(req.body);
    const restaurent = await Restaurent.findByIdAndUpdate(id, {...req.body});
    res.redirect(`/restaurent/${restaurent._id}`);
    }
})


// app.get('/', async(req, res) => {
//     await Restaurent.deleteMany({});
//     const d = new Restaurent({name: 'Sugu',website: 'www.sugus.com',image: 'https://images.unsplash.com/photo-1602520000000-8c8c8c8c8c8c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', number: 1234567890, time: new Date()});
//     await d.save();
//     const data = await Restaurent.find({});
//     res.send(data);
// })

app.get('/', async (req, res) => {
    const data = await Restaurent.find({});
    res.render('index',{data});
    // res.send(data);
});

app.get('/login', (req, res) => {
    res.render('login');
    // res.send(data);
});
app.get('/notification', (req, res) => {
    res.render('notification');
    // res.send(data);
});

// app.post('/notification', (req, res) => {
//     res.render('notification');
//     // res.send(data);
// });

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.get('/newRestaurant', (req, res) => {
    res.render('newRestaurant');
});
app.post('/newRestaurant',async (req, res) => {
    // res.render('newRestaurant');
    try {
        const newRestaurant = new Restaurent(req.body);
        await newRestaurant.save();
        req.flash('success', 'Successfully made a new restaurant!');
        res.redirect('/');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('/');
    }
});

app.get('/restaurent/:id',async (req,res)=>{
    const {id} = req.params;
    if(mongoose.Types.ObjectId.isValid(id)){
    const data = await Restaurent.findById(id);
    res.render('show',{data});
    // res.send(data);
    }else{
        req.flash('error', 'Invalid ID');
        res.redirect('/');
    }
});

app.delete('/restaurent/:id', async (req, res) => {
    const {id} = req.params;
    const deletedRestaurent = await Restaurent.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a restaurent');
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});