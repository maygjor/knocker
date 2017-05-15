'use strict';
var express = require('express');
var router = express.Router();
let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
let mongoose = require('mongoose');
let db = mongoose.connection;
let User = require('../models/user');
//register
router.get('/register', function (req, res) {
    let errors = [];
    let usercheck = [];
    let emailcheck = [];
    res.render('register.ejs', { errors: errors,usercheck,emailcheck});
});
//login
router.get('/login', function (req, res) {
    let state = [];  
    res.render('login.ejs', { state: state});
});
//register form handling
router.post('/register', function (req, res) {
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.password;
    let name = req.body.name;
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Enter a valid email@msg.com email syntax').isEmail();
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Repeat the same password').notEmpty();
    req.checkBody('password2', 'There is no match').equals(req.body.password);
    let errors = req.validationErrors();
    let usercheck = [];
    let emailcheck = [];
    if (errors) {
        res.render('register.ejs', { errors: errors, usercheck: usercheck,emailcheck:emailcheck });
        console.log(errors);
    } else {
        
            let newUser = new User({
                email: email,
                username: username,
                password: password,
                name: name
        });
            
            User.userCheck(newUser, (err, user) => {               
                if (user) {
                    console.log(user.username);
                    var usercheck = "Username is already in use";
                    res.render('register.ejs', { errors: errors, usercheck: usercheck,emailcheck:emailcheck });
                  
                } else{
                   // res.render('register.ejs', { errors: errors, usercheck: "", emailcheck:"" });
                    User.emailCheck(newUser, (err, output) => {
                        if (output) {
                            console.log(output.email);
                            var emailcheck = ("Email " + output.email + " is already registered");
                            res.render('register.ejs', { errors: errors,usercheck:usercheck, emailcheck: emailcheck });
                        } else {

                            User.createUser(newUser, (err, User) => {
                                console.log(User);
                            });
                            var state = "Successfully registered";
                            //res.redirect("/users/login"); 
                            res.render('login.ejs', { state: state });                           
                        }
                    });
                    
                }
            });        
    }
});
passport.serializeUser((user, done) => {
    done(null,user.id)
});
passport.deserializeUser((id, done)=>{
    User.getUserById(id, (err, user) => {
        done(err, user);
    });
});
passport.use(new localStrategy(
    function (username, password, done) {
        User.getUserByUsername(username, (err, user) => {
            //if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Unknown user' });
            }
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });
    }));


router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: false }),
    function(req, res){
        var accountState = "You are logged in";
        res.render('index.ejs', { accountState: accountState }); 
        
    });


    
router.get('/logout', (req,res) => {
    req.logout();
    let state='You logged out';
    res.render('login.ejs', { state: state });
    res.redirect('/users/login');
})


module.exports = router;
