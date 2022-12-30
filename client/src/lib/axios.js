import Axios from "axios";

const axios = Axios.create({
	baseURL: process.env.REACT_APP_KANBAN_SERVER_URL || "http://localhost:3050",
	headers: {
		"X-Requested-With": "XMLHttpRequest",
	},
});

export default axios;
