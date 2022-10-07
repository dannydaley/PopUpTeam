const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8080;

//Dependencies
app.use(express.json());
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
    const row = req.body.row; //Row to insert
    const insertRow = "INSERT INTO users (test) VALUES (?)"; //Insert query

    db.query(insertRow, [row], (err, rows) => { //Insert row into database
        if (err) throw err;
        console.log('inserted: ' + row); //Print row inserted
    });
});

//Delete from database
app.delete('/api/delete/:row', (req, res) => {
    const row = req.params.row;
    const deleteRow = "DELETE FROM users WHERE test = ?";

    db.query(deleteRow, [row], (err, rows) => {
        if (err) throw err;
        console.log('deleted: ' + row);
    });
});

//Server port
app.listen(process.env.PORT || PORT, () => {
    console.log('Server started on port ' + PORT);
});