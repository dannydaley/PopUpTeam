const { Project } = require("../models");

const getAllProjects = async (req, res) => {
	const projects = await Project.findAll();
	res.status(200).json({ data: projects });
};

const createProject = async (req, res) => {
	const projectTitle = req.body.projectTitle;
	const project = await Project.create({ title: projectTitle });
	res.status(200).json({ data: project });
};

const updateProject = async (req, res) => {
	const newProjectTitle = req.body.newProjectTitle;
	const projectId = req.body.projectId;

	await Project.update(
		{ title: newProjectTitle },
		{
			where: {
				id: projectId,
			},
		}
	);
	res.status(200);
};

const deleteProject = async (req, res) => {
	const projectId = req.body.projectId;
	console.log(projectId);

	await Project.destroy({
		where: {
			id: projectId,
		},
	});

	res.status(200);
};

module.exports = {
	getAllProjects,
	createProject,
	updateProject,
	deleteProject,
};
