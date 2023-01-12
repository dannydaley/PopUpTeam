const express = require('express');
const router = express.Router();

const db = require('../config/db');

router.get("/getDirectory", (req, res, next) => {
    db.query("SELECT user_name, first_name, last_name, about_me, location, education, work, profile_picture FROM users", [], (err, directoryData) => {
        //if error
        if (err) {
            // respond with error status and message
            res.status(500).send(err.message);
            return;
        }
        // respond with data if no errors
        res.json(directoryData);
    });
});

module.exports = router;