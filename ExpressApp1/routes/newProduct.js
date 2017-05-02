
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/newproduct', function (req, res, next) {
    res.render('newProduct.ejs', { product: "new product", imagesource: "photo.png" });
});

module.exports = router;