const { Project, Column, Task } = require("../models");
const TaskController = require("./TaskController");

const getColumns = async (req, res) => {
	const parentProjectId = req.query.projectId;
	let columns = [];

	if (parentProjectId != null) {
		const parentProject = await Project.findOne({
			attributes: ["content"],
			where: {
				id: parentProjectId,
			},
		});

		if (parentProject.content != null) {
			for (const id of parentProject.content.split(",")) {
				columns.push(await Column.findOne({ where: { id: id } }));
			}
			for (const column of columns) {
				column.content = await TaskController.getAllTasks(column.id);
			}
		}
	}

	res.status(200).json({ data: columns });
};

const createColumn = async (req, res) => {
	const columnTitle = req.body.columnTitle;
	const parentProjectId = req.body.selectedProjectId;
	let content = null;

	// Get already stored columns
	const parentProject = await Project.findOne({
		attributes: ["content"],
		where: {
			id: parentProjectId,
		},
	});

	const createdColumn = await Column.create({
		title: columnTitle,
		parent_id: parseInt(parentProjectId),
		content: null,
	});

	if (parentProject.content !== null) {
		content = parentProject.content;
		content += `,${createdColumn.id}`;
	} else {
		content = createdColumn.id;
	}

	await Project.update(
		{ content: content },
		{
			where: { id: parentProjectId },
		}
	);

	res.status(200).json("OK");
};

const updateColumn = async (req, res) => {
	const newColumnTitle = req.body.newColumnTitle;
	const columnId = req.body.columnId;

	await Column.update(
		{ title: newColumnTitle },
		{
			where: {
				id: columnId,
			},
		}
	);

	res.status(200).json("OK");
};

const deleteColumn = async (req, res) => {
	const columnId = req.body.columnId;

	const column = await Column.findOne({ where: { id: columnId } });

	let newContent = "";

	const parentProject = await Project.findOne({
		where: { id: column.parent_id },
	});

	const contentArray = parentProject.content.split(",");
	contentArray.filter((item, index, array) => {
		if (item == columnId) {
			array.splice(index, 1);
		}
	});

	if (contentArray.length === 0) {
		newContent = null;
	} else {
		contentArray.forEach((item, index, array) => {
			if (array.length < 2) {
				newContent = `${item}`;
			} else {
				if (index + 1 === array.length) {
					newContent += `${item}`;
				} else {
					newContent += `${item},`;
				}
			}
		});
	}

	await Project.update(
		{ content: newContent },
		{
			where: { id: column.parent_id },
		}
	);

	await Task.destroy({ where: { parent_id: columnId } });

	await Column.destroy({
		where: {
			id: columnId,
		},
	});

	res.status(200).json("OK");
};

module.exports = {
	getColumns,
	createColumn,
	updateColumn,
	deleteColumn,
};
