const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	const Project = sequelize.define("Project", {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
	return Project;
};
