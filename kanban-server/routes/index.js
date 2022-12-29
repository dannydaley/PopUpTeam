var express = require("express");
var router = express.Router();
var ProjectController = require("../controllers/ProjectController");
var ColumnController = require("../controllers/ColumnController");

router.get("/", function (req, res, next) {
	res.send("Kanban server 3000");
});

router.get("/projects", ProjectController.getAllProjects);
router.get("/project", ProjectController.createProject);
router.post("/project", ProjectController.createProject);
router.put("/project", ProjectController.updateProject);
router.delete("/project", ProjectController.deleteProject);

router.get("/columns", ColumnController.getColumns);
router.post("/column", ColumnController.createColumn);
router.put("/column", ColumnController.updateColumn);
router.delete("/column", ColumnController.deleteColumn);

module.exports = router;
