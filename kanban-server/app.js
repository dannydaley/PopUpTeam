var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { Sequelize } = require("sequelize");

// Setup database connection
const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite",
});

// Test database connection
sequelize
	.authenticate()
	.then(() => {
		console.log("Database connection successful");
	})
	.catch((err) => {
		console.error(`Database connection error: ${err}`);
	});

// CORS settings
var corsOptions = {
	origin: process.env.CLIENT_URL,
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	credentials: true,
};

var indexRouter = require("./routes/index");

var app = express();

// Pass database instance for controllers
app.set("db", sequelize);

app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
