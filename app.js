const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const hbs = require('express-handlebars');
const config = require('./config');
const validator = require('express-validator');
//const cookieSession = require('cookie-session');
const session = require('express-session');
const flash = require('express-flash');

mongoose.connect(`mongodb://${config.database.host}:${config.database.port}/${config.database.name}`, { useNewUrlParser: true, useCreateIndex: true });

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout',  layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(validator());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	key: 'user_sid', 
	secret: config.secret, 
	saveUninitialized: false, 
	resave: false, 
	cookie: { 		
		expires: new Date(Date.now() + 60 * 60 * 1000)
	} 
}));
app.use(flash());

 // This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req, res, next) => {
	if(req.cookies.user_sid && !req.session.user){
		res.clearCookie('user_id');
	}
	next();
});


app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/js', express.static(__dirname + '/node_modules/startbootstrap-sb-admin'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); 
app.use('/css', express.static(__dirname + '/node_modules/startbootstrap-sb-admin'));

app.use('/', indexRouter);

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

module.exports = app;
