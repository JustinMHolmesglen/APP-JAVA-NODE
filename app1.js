var createError = require('http-errors');
const express =  require('express');
const app = express();
const allData = [];
const bodyParser = require('body-parser');
/*const Database = require('nedb');*/
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash');
var session = require('express-session');


app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'js')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}

}));

app.use(flash());


/*const database = new Database('database.db');
database.loadDatabase();*/

/* GET home page. */
app.get('/', function(req, res, next) {
    res.render('contact-us', { title: 'Contact-Us' });
  });

app.post('/contact-us', (req, res, next) => {
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    
});

var sql = `INSERT INTO contacts (first_name, last_name, email, password, created_at) VALUES ("${first_name}", "${last_name}", "${email}", "${password}", NOW())`;
db.query(sql, function(err, result) {
  if (err) throw err;
  console.log('record inserted');
  req.flash('success', 'Data added successfully!');
  res.redirect('/');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
// set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
res.status(err.status || 500);
res.render('error');
});

app.listen(3000, () => console.log("listening on port 3000"));

module.exports = app;

