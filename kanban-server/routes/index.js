var express = require("express");
var router = express.Router();
var ProjectController = require("../controllers/ProjectController");

router.get("/", function (req, res, next) {
	res.send("Kanban server 3000");
});

router.get("/projects", ProjectController.getAllProjects);
router.get("/project", ProjectController.createProject);
router.post("/project", ProjectController.createProject);
router.put("/project", ProjectController.updateProject);
router.delete("/project", ProjectController.deleteProject);

module.exports = router;
