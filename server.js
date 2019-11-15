const express = require('express')
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000
const methodOverride = require('method-override');
require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;
const host = process.env.CLUSTER
const dbupdateobject = { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false , useCreateIndex: true};
const moment = require('moment');
const bcrypt = require('bcrypt');
const session = require('express-session');

/////////////////////
//MIDDLEWARE
/////////////////////
// app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: "feedmeseymour", //some random string
    resave: false,
    saveUninitialized: false
}));
app.use(express.json());

//////////////////////
//CONTROLLERS
///////////////////
const bookmarkControl = require('./controllers/bookmark.js');
const usersControl = require('./controllers/users.js');
app.use('/bookmarkapi', bookmarkControl);
app.use('/users', usersControl);

/////////////////////
//DATABASE
/////////////////////

// Configuration
const mongoURI = host;

// Connect to Mongo
mongoose.connect( mongoURI, dbupdateobject );

// Connection Error/Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongoURI));
db.on('disconnected', () => console.log('mongo disconnected'));
db.on( 'open' , ()=>{
  console.log('Connection made!');
});


/////////////////////////
//RUNTIME DATA
/////////////////////////




/////////////////////
//Listener
/////////////////////
app.listen(port, () => console.log(`Hello Alex I'm listening on ${port}!`))


/////////////////////
//User Route
/////////////////////
//user Route
// app.get('/', (req, res) => res.render('main.ejs'))
//
// app.get('/new', (req, res) => res.render('newuser.ejs'))
//
// app.post('/new', (req, res)=>{
//     console.log(req.body)
//     req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//     Users.create(req.body, (error, createdUser)=>{
//         console.log(createdUser)
//         res.redirect('/');
//     });
// });
//
// app.get('/login', (req, res) => res.render('login.ejs'))
//
// app.get('/logout', (req, res) => {
//     req.session.destroy((err)=>{
//        if(err){
//            res.redirect('/index')
//        } else {
//            res.redirect('/')
//        }
//    });})
//
// app.post('/login', (req, res)=>{
//     Users.findOne({username: req.body.username}, (error, user)=>{
//         if (user === null){
//             res.redirect('/');
//         }else{
//         console.log(user);
//         if (bcrypt.compareSync(req.body.password, user.password)){
//             req.session.login = true;
//             req.session.user = req.body.username;
//             console.log('correct password');
//             res.redirect('/index');} else{console.log('wrong password')
//                 res.redirect('/')};}
//     });
// });

/////////////////////
//Static Files
/////////////////////
app.use(express.static('public'));
