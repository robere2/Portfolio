const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sassMiddleware = require('node-sass-middleware');

let index = require('./routes/index');
let captcha = require('./routes/captcha');
let privacy = require('./routes/privacy');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Uncomment for debug
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 7 * 24 * 60 * 60 * 1000}));

// Defining our pages
app.use('/', index);
app.use('/', captcha);
app.use('/', privacy);

app.all('*', function(req, res) {
  res.status(404);
  res.render('error', {message: "Page not found", error: {status: "Looks like you took a wrong turn..."}});
});

module.exports = app;

