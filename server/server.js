const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 8080;

//Dependencies
app.use(express.json());
app.use(cors());




// users table setup endpoint

let userDataJSON = require("./config/users.json");

app.get('/api/usersSetup', (req, res, next) => {
    db.query(() => {
      //delete the table if it exists..   
      db.query('DROP TABLE IF EXISTS users');
      //recreate the users table  
      db.query('CREATE TABLE users (id INTEGER PRIMARY KEY AUTO_INCREMENT, username varchar(255) UNIQUE, firstName varchar(255), lastName varchar(255), email varchar(255) UNIQUE, password varchar(255), passwordSalt varchar(512), aboutMe text, location varchar(255), education varchar(255), work varchar(255), profilePicture varchar(255))', (err, rows) => {
          if (err) console.log(err);
          console.log(rows)
      });
      //create array of users from the dummy data JSON file
      let users = userDataJSON.users; 


      //insert each element in the array of objects into the users table in the database
      users.forEach((user) => {
        // SQL query to run
        db.query('INSERT INTO users (username, firstName, lastName, email, password, passwordSalt, aboutMe, location, education, work, profilePicture) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?)', 
          // values passed in from current iteration of the users array
          [user.username, user.firstName, user.lastName, user.email, user.password, user.passwordSalt, user.aboutMe, user.location, user.education, user.work, user.profilePicture ], (err) => {
              if (err) console.log(err);
          });
      });
    });
    // respond with success page

    console.log("users table set up");
    res.send("user-db-done");
  });


//Select all rows from table
app.get('/api/get', (req, res) => {
    const selectAll = 'SELECT * FROM users';
    db.query(selectAll, [],(err, rows) => {        
        if (err) throw err;
        res.send(rows);
    });
});

app.get('/getAllUsers', (req, res, next) => {
    // grab all user data
    db.query("SELECT * FROM users", [], (err, userData) => {
      // if error
      if (err) {
        // respond with error status and error message
        res.status(500).send(err.message);
        return;
      };
      // respond with userData on success
      res.send(userData);
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