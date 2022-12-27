const getAllProjects = async (req, res) => {
	const db = req.app.get("db");
    db
	res.status(200).json({ data: null });
};

module.exports = {
	getAllProjects,
};
