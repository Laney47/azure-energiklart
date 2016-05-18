var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var config= {
  userName: 'venovu@energiklart',
  password: '!fE92bXp4',
  server: 'energiklart.database.windows.net',
  // When you connect to Azure SQL Database, you need these next options.
  options: {encrypt: true, database: 'Energiklart'}
};
var connection = new Connection(config);
var obj = {};

/* GET home page. */
router.get('/', function(req, res, next) {

  connection.query("SELECT userName FROM [venovu_com].[user]", function (err, results) {
    if (err) {
      throw err;
    } else {
      obj = {title: results};
      res.render('index', obj);

    }


  });
});
module.exports = router;
