var express = require('express'); 
var path = require('path');
var cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
const config = require('./config/database');

var usersRouter = require('./routes/users');

// MongoDB
const mongoDB = config.database;
mongoose.set("strictQuery", true);
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

module.exports = app;
