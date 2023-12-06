var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var path = require('path');

var indexRouter = require('./server/router');

var app = express();

const cors = require('cors');
app.use(cors({ origin: ['*'] }));

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client')));

app.use('/', indexRouter);

module.exports = app;
