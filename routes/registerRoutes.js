const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');

//setting up template engine: pug to render content
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false})); 

router.get('/', (req, res, next)=>{

    res.status(200).render('register');//handling get requests

})
router.post('/', async (req, res, next)=>{
    var firstName = req.body.firstName.trim();
    var middleName = req.body.middleName.trim();
    var lastName = req.body.lastName.trim();
    var userName = req.body.userName.trim();
    var email = req.body.email.trim();
    var password = req.body.password;

    var payload = req.body;//return all the info input to the so the user does not enter again after failed sign up

    if(firstName && lastName && userName && email && password){
        var user = await User.findOne({
            $or: [
                {userName: userName},
                {email: email}
            ]
          })//running validations to check if user exists 
          .catch((error) => {
            console.log(error);
            payload.errorMessage = "Oops! Something went wrong"; //database server error
            res.status(200).render('register', payload);//return to register page 

          });

          if(user==null){
            //no user found:create a user
            var data = req.body;

            //encrypting user password before sending to database
            data.password = await bcrypt.hash(password, 15);
            User.create(data)
            .then((user)=>{
                req.session.user = user; // remember user session
                return res.redirect('/'); //redirect user to homepage if logged in
            })


          }
          else{
            //user found
            if(email == user.email){
                payload.errorMessage = "Email already in use";
            }
            else{
                payload.errorMessage = "Username already in use";
            }
            res.status(200).render('register', payload);//return to register page 
            }
          }

            
    })
    
    // else{
    //     payload.errorMessage = "Make sure required fields are filled";
    //     res.status(200).render('register', payload);//handling get requests
    // }
// });
//router.post
module.exports = router;