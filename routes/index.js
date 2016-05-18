var express = require('express');
var router = express.Router();

var app = app;



/* GET home page. */
router.get('/', function(req, res, next) {

    // If no error, then good to proceed.

    res.render('index' , {title : 'Energiklart' });


});
module.exports = router;

