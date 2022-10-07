const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const mysql = require('mysql');

//Database setup
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: ''
});

//Dependencies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Select all rows from table
app.get('/api/get', (req, res) => {
    const selectAll = 'SELECT * FROM users';

    db.query(selectAll, (err, rows) => {
        if (err) throw err;
        res.send(rows);
    });
});

//Insert into database
app.post('/api/insert', (req, res) => {
    const row = req.body.row;
    const insert = "INSERT INTO users (test) VALUES (?)";

    db.query(insert, [row], (err, rows) => {
        if (err) throw err;
        console.log("inserted: " + row);
    });
});

//Server port
app.listen(3001, () => {
    console.log('Server started on port 3001');
});