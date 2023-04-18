const { Task, Column } = require("../models");

const getAllTasks = async (columnId) => {
    let tasks = [];

    if (columnId != null) {
        const parentColumn = await Column.findOne({
            attributes: ["content"],
            where: {
                id: columnId,
            },
        });

        if (parentColumn.content != null) {
            for (const id of parentColumn.content.split(",")) {
                tasks.push(await Task.findOne({ where: { id: id } }));
            }
        }
    }

    return tasks;
};

const createTask = async (req, res) => {
    const taskTitle = req.body.taskTitle;
    const taskDesc = req.body.taskDesc;
    const parentColumnId = req.body.selectedColumnId;
    const taskDeadline = req.body.taskDeadline;
    const taskPerson = req.body.taskPerson;
    const taskColor = req.body.taskColor;
    let content = null;

    // Get already stored tasks
    const parentColumn = await Column.findOne({
        attributes: ["content"],
        where: {
            id: parentColumnId,
        },
    });

    const createdTask = await Task.create({
        title: taskTitle,
        desc: taskDesc,
        parent_id: parseInt(parentColumnId),
        deadline: taskDeadline,
        person: taskPerson,
        color: taskColor,
    });

    if (parentColumn.content !== null) {
        content = parentColumn.content;
        content += `,${createdTask.id}`;
    } else {
        content = createdTask.id;
    }

    await Column.update(
        { content: content },
        {
            where: { id: parentColumnId },
        }
    );

    res.status(200).json({ data: createdTask });
};

const updateTask = async (req, res) => {
    const newTaskTitle = req.body.newTaskTitle;
    const newTaskDesc = req.body.newTaskDesc;
    const newTaskDeadline = req.body.newTaskDeadline;
    const newTaskPerson = req.body.newTaskPerson;
    const newTaskLabel = req.body.newTaskColor;
    const taskId = req.body.taskId;

    const task = await Task.findOne({ where: { id: taskId } });

    let updatedTaskTitle = task.title;
    let updatedTaskDeadline = newTaskDeadline;

    if (newTaskTitle != null && newTaskTitle != "") {
        updatedTaskTitle = newTaskTitle;
    }

    if (newTaskDeadline === "") {
        console.log(newTaskDeadline);
        updatedTaskDeadline = null;
    }

    await Task.update(
        {
            title: updatedTaskTitle,
            desc: newTaskDesc,
            deadline: updatedTaskDeadline,
            person: newTaskPerson,
            color: newTaskLabel,
        },
        {
            where: {
                id: taskId,
            },
        }
    );

    res.status(200).json("OK");
};

const deleteTask = async (req, res) => {
    const taskId = req.body.taskId;

    const task = await Task.findOne({ where: { id: taskId } });

    let newContent = "";

    const parentColumn = await Column.findOne({
        where: { id: task.parent_id },
    });

    const contentArray = parentColumn.content.split(",");
    contentArray.filter((item, index, array) => {
        if (item == taskId) {
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

    await Column.update(
        { content: newContent },
        {
            where: { id: task.parent_id },
        }
    );

    await Task.destroy({
        where: {
            id: taskId,
        },
    });

    res.status(200).json("OK");
};

module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};
