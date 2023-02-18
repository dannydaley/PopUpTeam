let mysql = require("mysql");
/* 
  If you encounter: 
  Error: Connection lost: The server closed the connection

  This is heroku closing the connection after inactivity as the free tier is limited to 30 minutes of inactivity
  To fix this re run npm run dev or npm start in the server folder

  If you encounter:
  Error: Access denied too many requests

  This is often heroku closing the connection after too many requests
  This could also be a permission error caused by code in the server folder
  This is because free plan the database uses caps at 3600 requests per hour
  
  The likely causes of the requests cap being reached are:
    - Missing an empty dependencies in a useEffect
    - An infinite loop query or http request
  To fix this wait an hour or re run npm run dev or npm start in the server folder
*/

//Database setup
var db = mysql.createConnection({
    host: process.env.DATABASEHOST,
    port: process.env.DATABASEPORT,
    user: process.env.DATABASEUSER,
    password: process.env.DATABASEPASSWORD,
    database: process.env.DATABASENAME,

    // host: "eu-cdbr-west-03.cleardb.net",
    // user: "bf0cbc17226879",
    // port: 3306,
    // password: "671885a1",
    // database: "heroku_f29376daf1042d8",

    // host: "mysql15.namesco.net",
    // user: "popupteam2",
    // port: 3306,
    // password: "popupteam2023",
    // database: "PH855758_popupteam2",

    //Local
    // host: "localhost",
    // user: "root",
    // port: 3306,
    // password: "password",
    // database: "comp370_popup_team",
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Database Connected!");
});

module.exports = db;
