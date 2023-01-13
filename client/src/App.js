import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Index";
import About from "./pages/About";
import BecomeACreative from "./pages/BecomeACreative";
import Settings from "./pages/Settings";
import Dashboard from "./pages/Dashboard";


import Login from "./pages/BusinessLogin";
import Register from "./pages/BusinessRegister";

import CreativeDirectory from "./pages/CreativeDirectory";
import NewProject from "./pages/NewProject";
import Project from "./pages/Project";

import Error from "./pages/404";

import KanbanPage from "./pages/KanbanPage";

axios.defaults.withCredentials = true; // Allows axios to send cookies to the server

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			firstName: "",
			lastName: "",
			aboutMe: "",
			profilePicture: "",
		};
	}

	updateUserInfo = (username, firstName, lastName, aboutMe, profilePicture) => {
		this.setState({
			username: username,
			firstName,
			lastName,
			aboutMe,
			profilePicture,
		});
	};

	render() {
		return (
			<Routes>
				{/* Index */}
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/become-a-creative" element={<BecomeACreative />} />

				{/* Authentication */}
				<Route
					path="/business-login"
					element={<Login updateUserInfo={this.updateUserInfo} />}
				/>
				<Route path="/business-register" element={<Register />} />

				{/* Directory */}
				<Route
					path="/directory"
					element={<CreativeDirectory userData={this.state} />}
				/>
				<Route path="/projects" element={<NewProject />} />
				<Route path="*" element={<Error />} />
                <Route path="/settings" element={<Settings />} />
				<Route path="/dashboard" element={<Dashboard />} />
                <Route path="/project" element={<Project />} />



				{/* Kanban */}
				<Route path="/kanban" element={<KanbanPage />} />
			</Routes>
		);
	}
}
