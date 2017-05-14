'use strict';
var express = require('express');
var router = express.Router();
let mongo = require('mongodb');
let assert = require('assert');
/* GET home page. */
router.get('/', ensureAuthenticated, (req, res) => {
    let accountState = [];
    res.render('index.ejs', { title: "Home page", photo: "photo.png", accountState:accountState });
});
function ensureAuthenticated(req, res, next,err) {
    if (err) throw err;
    if (req.isAuthenticated()) {
        let accountState = 'You are logged in';
        res.render('index.ejs', { title: "Home page", photo: "photo.png", accountState: accountState });
        return next();
    } else {
        let accountState = 'You are not logged in';
        res.render('index.ejs', { title: "Home page", photo: "photo.png", accountState: accountState});
        res.redirect('users/login');
    }
}

router.get('/get-data', (req, res, nxt) => { });

router.post('/insert', (req, res,collec,item, nxt) => {
    mongo.connect(url, (db,err) => {
        assert.equal(null, err)
        db.collection(collec).insert(item, () => {
            assert.equal(null, err);
            console.log('item inserted.');
        })
    })
});
router.post('/update', (req, res, nxt) => { });
router.post('/delete', (req, res, nxt) => { });

module.exports = router;





