exports.requireLogins = (req, res, next)=>{
    if(req.session && req.session.user){
        return next();
    }//perform action specfied in app.js if user has logged in
    else{
        return res.redirect('/Login');
    }// else call this function
}