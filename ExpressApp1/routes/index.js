'use strict';
var express = require('express');
var router = express.Router();
let mongo = require('mongodb');
let assert = require('assert');
var url = "mongodb://localhost:27017/test";
/* GET home page. */
router.get('/', function (req, res, nxt) {
    res.render('index.ejs', { title: "Home page", photo: "photo.png" });
});
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





