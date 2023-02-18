const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var session = require("cookie-session");
// const session = require('express-session');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Session setup
app.use(
    session({
        key: "user_id",
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Max age one day
        },
    })
);

module.exports = app;
