var express = require("express");
var router = express.Router();
var ProjectController = require("../controllers/ProjectController");

router.get("/", function (req, res, next) {
	res.send("Kanban server 3000");
});

router.get("/get-projects", ProjectController.getAllProjects);

module.exports = router;
