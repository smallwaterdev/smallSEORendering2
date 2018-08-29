const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// route
const metaListRoute = require('./routes/meta_list_route');
const contentRoute = require('./routes/content_route');
const contentListRoute = require('./routes/content_list_route');
const starnameContentListRoute = require('./routes/starname_content_list_route');
const directorContentListRoute = require('./routes/director_content_list_route');
const studioContentListRoute = require('./routes/studio_content_list_route');
const rootContentListRoute = require('./routes/root_content_list_route');
const genreContentListRoute = require('./routes/genre_content_list_route');

let app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/**
 * url pattern
 * /
 * /content/:id
 * /list/:sort[/:page]
 * /pornstar/:name[/:sort[/:page]]
 * /director/:name[/:sort[/:page]]
 * /studio/:name[/:sort[/:page]]
 * /director/:name[/:sort[/:page]]
 * /meta/:field[/:page]
*/
app.use('/meta',metaListRoute);
app.use('/content', contentRoute);
app.use('/category', genreContentListRoute);
app.use('/list', contentListRoute);
app.use('/pornstar', starnameContentListRoute);
app.use('/director', directorContentListRoute);
app.use('/studio', studioContentListRoute);
app.use('/', rootContentListRoute);

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
