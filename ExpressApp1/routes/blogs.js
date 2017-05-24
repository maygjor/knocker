'use strict';
var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let db = mongoose.connection;
let Blog = require('../models/blog');
router.get('/newBlog', (req, res) => {

});
router.post('/newBlog', (req, res) => {
    let newBlog = new Blog({
        title: req.body.title,
        author: req.body.author,
        body: req.body.post,
        date: Date.now(),
        tags:req.body.tags,
        meta: {
            votes: 0,
            favs: 0
        }
    });
    Blog.createBlog(newBlog, (err, Blog) => {
        console.log(Blog +" created!");
    });
});