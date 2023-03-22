const express = require('express');
const app = express();
const port = 8001;
const middleware = require('./middleware');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('./dbconnects');
const session = require('express-session');


//starting server
const server = app.listen(port, ()=>
console.log("Server listening on port " + port ));



//setting up template engine: pug to render content
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false})); //

//creating new instance of session
app.use(session({
    secret:"kd", //encrypting user session 
    resave:true,
    saveUninitialized: false
}));



//directing the server to serve contents of public directory as static files
app.use(express.static(path.join(__dirname, 'public')));



//declaring routes 
const loginRoute = require('./routes/loginRoutes');
const registerRoute = require('./routes/registerRoutes');


app.use('/login', loginRoute); //directing the server to login page if user has logged in yet
app.use('/register', registerRoute); //directing the server to sign up page if user is not a member yet



app.get('/', middleware.requireLogins,(req, res, next)=>{
// calling the login middleware function to check if user has logged in 
// display home page else redirect them to login page
 
    var payLoad = {
        pageTitle: "Home",
        userLoggedIn: req.session.user //send user data to home page when logged in

    }

    res.status(200).render('home', payLoad);
});