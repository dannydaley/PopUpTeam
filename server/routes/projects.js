const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all projects user has created
router.get("/created", (req, res) => {
    // get users user name from session data
    const username = req.session.userData.username;
    //SQL queries
    const getLeaderProjects = `SELECT * FROM Projects WHERE leader = ?`;
    const getMemberProjects = `SELECT * FROM relationships WHERE user1 = ? OR user2 = ? AND isProject = ?`;
    const getMemberProjectData = `SELECT * FROM Projects WHERE title = ?`;
    // set up empty rows object ready to be sent to front end
    let rows = { leader: [], member: [] };
    // member list to store project names to be queried against the db
    let memberList = [];
    // get project names that the user is a part of
    db.query(getMemberProjects, [username, username, true], (err, member) => {
        if (err) throw err;
        // only set name entries that are not the users username to the name list
        member.forEach((item) =>
            item.user1 === username
                ? memberList.push(item.user2)
                : memberList.push(item.user1)
        );

        // query the project data for each name in the project name list
        memberList.forEach((listItem) => {
            db.query(getMemberProjectData, [listItem], (err, memberProject) => {
                if (err) throw err;
                // push the project data to the object to be returned to front end
                rows.member.push(memberProject[0]);
            });
        });

        // get all project data of those that the user is a leader of
        db.query(getLeaderProjects, [username], (err, leader) => {
            if (err) throw err;
            // apply to object ready to be returned to front end
            rows.leader = leader;
            // return to front end
            res.send(rows);
        });
    });
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
