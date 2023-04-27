const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all projects user has created
router.get("/created", (req, res) => {
  const name = req.session.userData.firstName + " " + req.session.userData.lastName;
  const getProjects = `SELECT * FROM Projects WHERE leader = ?`;

  db.query(getProjects, [name], (err, rows) => {
    if (err) throw err;

    res.send(rows);
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