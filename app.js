var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();


var app = express();
var Connection = require('tedious').Connection;
var config= {
  userName: 'venovu@energiklart',
  password: '!fE92bXp4',
  server: 'energiklart.database.windows.net',
  // When you connect to Azure SQL Database, you need these next options.
  options: {encrypt: true, database: 'Energiklart'}
};
var connection = new Connection(config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});






var Request = require('tedious').Request;

function executeStatement(){


  request = new Request("SELECT * FROM [venovu_com].[user]", function (err) {
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



router.get('/', function(req, res, next) {


  res.render('index' , {title: "Hej"});

});

connection.on('connect', function(err) {
  // If no error, then good to proceed.
  console.log("Connected");
  executeStatement();
});

module.exports = router;
module.exports = app;