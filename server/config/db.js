const mysql = require('mysql');

//Database setup
const db = mysql.createPool({
    //Local
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: ''    
});

module.exports = db;
