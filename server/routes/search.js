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

router.post("/getProjects", (req, res, next) => {
    let username = req.body;
    db.query(
        "SELECT * FROM `relationships` LEFT OUTER JOIN ON `Projects`.`title` WHERE ((`relationships`.`user1` = ? OR `relationships`.`user2` = ?) AND `isProject` = ?)",
        [username, username, true],
        (err, data) => {
            if (err) {
                // respond with error status and message
                console.log(err);
                res.status(500).send(err.message);
                return;
            }
            let projectList = [];
            data.forEach((element) => {
                if (element.user1 === username) {
                    projectList.push(element.user2);
                } else {
                    projectList.push(element.user1);
                }
                console.log(projectList);
            });

            // respond with data if no errors
            res.json({ data: data });
        }
    );
});

module.exports = router;
