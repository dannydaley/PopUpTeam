const { Project, Column, Task } = require("../models");

const getAllProjects = async (req, res) => {
	const projects = await Project.findAll();
	res.status(200).json({ data: projects });
};

const createProject = async (req, res) => {
	const projectTitle = req.body.projectTitle;
	const project = await Project.create({ title: projectTitle, content: null });
	res.status(200).json({ data: project });
};

const updateProject = async (req, res) => {
	const projectId = req.body.projectId;
	let newProjectTitle = req.body.newProjectTitle;
	let newProjectContent = req.body.newContent;
	let content = "";

	const project = Project.findOne({
		attributes: ["title", "content"],
		where: {
			id: projectId,
		},
	});

	if (newProjectTitle == null) {
		newProjectTitle = project.title;
	}
	if (newProjectContent == null) {
		content = project.content;
	} else {
		content += newProjectContent.map((id, index, array) => {
			if (index + 1 === array.length) {
				return id;
			} else {
				return `${id},`;
			}
		});
	}

	await Project.update(
		{ title: newProjectTitle, content: content },
		{
			where: {
				id: projectId,
			},
		}
	);

	res.status(200).json("OK");
};

const deleteProject = async (req, res) => {
	const projectId = req.body.projectId;

	const columns = await Column.findAll({ where: { parent_id: projectId } });

	for (const column of columns) {
		await Task.destroy({ where: { parent_id: column.id } });
	}

	await Column.destroy({
		where: {
			parent_id: projectId,
		},
	});

	await Project.destroy({
		where: {
			id: projectId,
		},
	});

	res.status(200).json("OK");
};

module.exports = {
	getAllProjects,
	createProject,
	updateProject,
	deleteProject,
};
