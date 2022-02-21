var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const apiKeyAuth = require('api-key-auth');

const sequelize = require('./sequelize');
const { user } = sequelize.models;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var citiesRouter = require('./routes/cities');
var projectsRouter = require('./routes/projects');
var buildersRouter = require('./routes/builders');
var searchRouter = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Create the collection of api keys
const apiKeys = new Map();
apiKeys.set('123456789', {
  id: 1,
  name: 'app1',
  secret: 'secret1'
});

apiKeys.set('987654321', {
  id: 2,
  name: 'app2',
  secret: 'secret2'
});

// Your function to get the secret associated to the key id
function getSecret(keyId, done) {
  if (!apiKeys.has(keyId)) {
    return done(new Error('Unknown api key'));
  }
  const clientApp = apiKeys.get(keyId);
  done(null, clientApp.secret, {
    id: clientApp.id,
    name: clientApp.name
  });
}

app.use(session({
  secret: 'Y@%n9ssnQZgyjCAG&KP4gXJZ$s9RXnh2ETVgxDquSxAySaj^',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiKeyAuth({ getSecret }), citiesRouter);
app.use('/api', apiKeyAuth({ getSecret }), projectsRouter);
app.use('/api', apiKeyAuth({ getSecret }), buildersRouter);
app.use('/api', apiKeyAuth({ getSecret }), searchRouter);

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
