const mysql = require('mysql');

//Database setup
const db = mysql.createConnection({
    //Local
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'password',
    database: 'popup'    
});

module.exports = db;
