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



/* GET home page. */
router.get('/', function(req, res, next) {
  connection.on('connect', function(err) {
    // If no error, then good to proceed.
    console.log("Connected");
    res.writeHead('index' , {title : execute()});
  });

});
module.exports = router;

var Request = require('tedious').Request;
function execute(){


  request = new Request("SELECT userName FROM [venovu_com].[user]", function (err) {
    if (err) {
      console.log(err);}
  });
  var result = "";
    request.on('row', function(columns) {
      columns.forEach(function(column) {
        if (column.value === null) {
          console.log('NULL');
        } else {
          result+= column.value + " ";
        }
      });
      console.log(result);

    });

  connection.execSql(request);
  return result;
}

