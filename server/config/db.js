const mysql = require("mysql");

/* If you encounter: 
  Error: Connection lost: The server closed the connection

  This is heroku closing the connection after inactivity as the free tier is limited to 30 minutes of inactivity
  To fix this re run npm run dev or npm start in the server folder
*/

//Database setup
const db = mysql.createConnection({
  host: "eu-cdbr-west-03.cleardb.net",
  user: "bf0cbc17226879",
  port: 3306,
  password: "671885a1",
  database: "heroku_f29376daf1042d8",
});

module.exports = db;