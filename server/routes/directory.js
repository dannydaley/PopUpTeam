const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/getDirectory", (req, res, next) => {
    db.query(
        "SELECT user_name, first_name, last_name,profile_picture, about_me,phone, email,work,team,hourly_rate, birthday, location, country, education, work FROM users",
        [],
        (err, directoryData) => {
            //if error
            if (err) {
                // respond with error status and message
                console.log(err);
                res.status(500).send(err.message);
                return;
            }
            // respond with data if no errors
            res.json({ directoryData: directoryData });
        }
    );
});

module.exports = router;
