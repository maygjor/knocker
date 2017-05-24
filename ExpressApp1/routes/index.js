'use strict';
var express = require('express');
var router = express.Router();
let assert = require('assert');
let mongoose = require('mongoose');

let Blog = require('../models/blog');
let db = require('../models/user').db;
let reactHelper = require('react-helper');
let expressReactHelper = require('express-react-helper');
/* GET home page. */
router.get('/', ensureAuthenticated, (req, res) => {
    let accountState = [];
    db.collection('jobs').find().toArray(function (err, jobs) {
        console.log(jobs);
        const component = reactHelper.renderComponent('jobsReducer', jobs);
        res.render('index.ejs', { title: "Knowker", accountState: accountState, component });
    });
    
});
function ensureAuthenticated(req, res, next,err) {
    if (err) throw err;
    if (req.isAuthenticated()) {
        let accountState = 'You are logged in';
        console.log(accountState);
        res.render('index.ejs', { title: "Home page", accountState: accountState });
        return next();
    } else {
        let accountState = 'You are not logged in';
        res.render('index.ejs', { title: "Home page", accountState: accountState});
        res.redirect('users/login');
    }
}
router.get('/newpost', (req,res) => {
    res.render('templates/newBlogPost.ejs');
})




module.exports = router;





