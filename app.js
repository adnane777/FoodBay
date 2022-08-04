const express = require('express');
const app = express();
const path = require('path');

const engine = require('ejs-mate');
const Restaurent = require('./model/restaurent.js');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session'); 
const methodOverride = require('method-override')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./model/user.js');
// const authRoutes = require('./routes/auth-routes'); 




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
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(
    (req, res, next) => {
    res.locals.success = req.flash('success'),
    res.locals.error = req.flash('error')
    res.locals.kuUser = req.user;
    next();
    }
)


app.use(methodOverride('_method'));




app.get('/restaurent/:id/edit', async (req, res) => {
    const {id} = req.params;
    if(mongoose.Types.ObjectId.isValid(id)){
    const restaurent = await Restaurent.findById(id);
    res.render('editRestaurant', {restaurent});
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


app.get('/', async (req, res) => {
    const data = await Restaurent.find({});
    res.render('index',{data});
});

app.post('/signup',async (req,res)=>{
    const {username,password,email,number} = req.body;
    const user = new User({username,email,number});
    User.register(user,password)
    .then(user=>{
        req.login(user,err=>{
            if(err) return next(err);
            req.flash('success','You have logged in Successfully');
            res.redirect('/')
        })
    })
})

app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/login',passport.authenticate('local',{failureFlash: true, failureRedirect: '/login'}),(req,res)=>{
    req.flash('success',"You've Logged IN Succefully");
    res.redirect('/');
})

app.get('/logout',(req,res)=>{
    req.logout(err=>{
        req.flash("success","You've Logged Out.")
        res.redirect('/')
    })
})

app.get('/notification', (req, res) => {
    res.render('notification');
});

// app.post('/notification', (req, res) => {
//     res.render('notification');
//     // res.send(data);
// });

app.get('/feedback', (req, res) => {
    res.render('feedback');
});

app.get('/ourteam', (req, res) =>{
    res.render('ourteam');
});

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
        newRestaurant.owner = req.user._id;
        await newRestaurant.save();
        req.flash('success', 'Successfully made a New Restaurant !');
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
    req.flash('success', 'Successfully Deleted the Restaurent');
    res.redirect('/');
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});