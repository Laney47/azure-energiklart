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
  connection.on('connect', function(err) {
    // If no error, then good to proceed.
    console.log("Connected");
    execute(res.render());
  });
});
module.exports = router;


function execute(res){


  request = new Request("SELECT userName FROM [venovu_com].[user]", function (err, results) {
    if (err) {
      throw err;
    } else {
      obj = {title: results};
      res.render('index', obj);

    }
    console.log(obj);

  });
  connection.execSql(request);
}

