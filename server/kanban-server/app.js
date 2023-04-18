// var express = require("express");
var path = require("path");
// var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// CORS settings
// var corsOptions = {
// 	origin: process.env.CLIENT_URL,

// 	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// 	credentials: true,
// };
// app.use(cors(corsOptions));

// var indexRouter = require("./routes/index");

// var app = express();

// app.use(
//     cors({
//         origin: [
//             "*",
//             "http://localhost:3000",
//             "http://dd252935.kemeneth.net",
//             "http://dd252935.kemeneth.net:9080",
//             "http://localhost:9080",
//             "http://localhost:3050",
//             "http://127.0.0.1:9080",
//         ],
//         methods: ["GET", "POST"],
//         credentials: true,
//     })
// );

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

module.exports = app;
