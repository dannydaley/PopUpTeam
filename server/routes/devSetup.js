var express = require("express");
var router = express.Router();
const db = require("../config/db");
const userDataJSON = require("../config/users.json");
const relationshipsJSON = require("../config/relationships.json");

// users table setup endpoint
router.get("/usersSetup", (req, res, next) => {
    db.query(() => {
        //delete the table if it exists..
        db.query("DROP TABLE IF EXISTS users");
        //recreate the users table
        db.query(
            "CREATE TABLE users (id INTEGER PRIMARY KEY AUTO_INCREMENT, user_name varchar(255) UNIQUE, first_name varchar(255), last_name varchar(255), email varchar(255) UNIQUE, password varchar(255), salt varchar(512), about_me text, phone varchar(255), location varchar(255), country varchar(255), birthday varchar(255), hourly_rate varchar(255), education varchar(255), work varchar(255), team varchar(255),profile_picture varchar(255))",
            (err, rows) => {
                if (err) console.log(err);
                console.log(rows);
            }
        );
        //create array of users from the dummy data JSON file
        let users = userDataJSON.users;
        //insert each element in the array of objects into the users table in the database
        users.forEach((user) => {
            // SQL query to run
            db.query(
                "INSERT INTO users (user_name, first_name, last_name, email, password, salt, about_me, phone, location, country, birthday,hourly_rate, education, work, team, profile_picture) VALUES(?,?, ?, ?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?)",
                // values passed in from current iteration of the users array
                [
                    user.user_name,
                    user.first_name,
                    user.last_name,
                    user.email,
                    user.password,
                    user.salt,
                    user.about_me,
                    user.phone,
                    user.location,
                    user.country,
                    user.birthday,
                    user.hourly_rate,
                    user.education,
                    user.work,
                    user.team,
                    user.profile_picture,
                ],
                (err) => {
                    if (err) console.log(err);
                }
            );
        });
    });
    // respond with success page
    res.send("user-db-done");
});

router.get("/relationshipsSetup", (req, res, next) => {
    db.query(() => {
        //delete the table if it exists..
        db.query("DROP TABLE IF EXISTS relationships");
        //recreate the relationships table
        db.query(
            "CREATE TABLE users (user1 varchar(255), user2 varchar(255), isProject bool , role varchar(255)",
            (err, rows) => {
                if (err) console.log(err);
                console.log(rows);
            }
        );
        //create array of relationships from the dummy data JSON file
        let relationships = relationshipsJSON.relationships;
        //insert each element in the array of objects into the relationships table in the database
        realtionships.forEach((relationship) => {
            // SQL query to run
            db.query(
                "INSERT INTO relationships (user1, user2, isProject, role) VALUES(?,?, ?, ?)",
                // values passed in from current iteration of the relationships array
                [
                    relationship.user1,
                    relationship.user2,
                    relationship.isProject,
                    relationship.role,
                ],
                (err) => {
                    if (err) console.log(err);
                }
            );
        });
    });
    // respond with success page
    res.send("relationships-db-done");
});

router.get("/getAllUsers", (req, res, next) => {
    // grab all user data
    db.query("SELECT * FROM users", [], (err, userData) => {
        // if error
        if (err) {
            // respond with error status and error message
            res.status(500).send(err.message);
            return;
        }
        // respond with userData on success
        res.send(userData);
    });
});

router.get("/getAllRelationships", (req, res, next) => {
    // grab all relationship data
    db.query("SELECT * FROM relationships", [], (err, relationshipData) => {
        // if error
        if (err) {
            // respond with error status and error message
            res.status(500).send(err.message);
            return;
        }
        // respond with relationships on success
        res.send(relationshipData);
    });
});

module.exports = router;
