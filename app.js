const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const movieRouter = require('./routes/movie');

const app = express();

/**
 * mongodb connection
 */
const db = require("./helper/db")();
/**
 * end mongodb connection
 */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * routing to address
 */
app.use('/', indexRouter);
app.use('/api/movies', movieRouter);
/**
 * end routing to address
 */

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});


// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development

    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error: {message: err.message, code: err.code}});//next ile gönderdiğin obje ile tam uyuşacak
});

module.exports = app;
