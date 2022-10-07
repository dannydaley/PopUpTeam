const mysql = require('mysql');

//Database setup
const db = mysql.createPool({
    //Local
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'web310_a1'    
});

module.exports = db;
