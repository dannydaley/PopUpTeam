import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SettingsIcon from "../images/settingsIcon";
import axios from "../lib/axios";
import Popup from "reactjs-popup";
import BinIcon from "../images/binIcon";
import Board from "../components/kanban/Board";

const Kanban = () => {
	// Projects array (all projects data)
	const [projects, setProjects] = useState([]);

	// Used to store the title of new projects when creating them
	const [createProjectTitle, setCreateProjectTitle] = useState("");

	// Information about the selected project
	const [selectedProjectId, setSelectedProjectId] = useState(null);
	const [selectedProject, setSelectedProject] = useState(null);

	// Used to store the updated title of projects when changing their title
	const [newProjectTitle, setNewProjectTitle] = useState("");

	// Deletes a project stored on the server using HTTP request

	const handleDeleteProject = () => {
		axios
			.delete("/project", {
				data: {
					projectId: selectedProjectId,
				},
			})
			.then((result) => {
				console.log(result);
				getAllProjects();
			})
			.catch((error) => {
				console.log(error);
			});
		setSelectedProjectId(-1);
		setSelectedProject(null);
	};

	// Updates a project stored on the server using HTTP request

	const handleUpdateProject = () => {
		axios
			.put("/project", {
				projectId: selectedProjectId,
				newProjectTitle: newProjectTitle,
				newContent: null,
			})
			.then((result) => {
				console.log(result);
				getAllProjects();
			})
			.catch((error) => {
				console.log(error);
			});
		setNewProjectTitle("");
	};

	// Creates a project to be stored on the server using HTTP request
	const handleCreateProject = () => {
		axios
			.post("/project", { projectTitle: createProjectTitle })
			.then((result) => {
				setSelectedProjectId(result.data.data.id);
				getAllProjects();
			})
			.catch((error) => {
				console.log(error);
			});
		setCreateProjectTitle("");
	};

	// Requests all the project from the server using HTTP request

	const getAllProjects = () => {
		axios
			.get("/projects")
			.then((results) => {
				setProjects(results.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	// Set the selected project whenever the project dropdown changes

	useEffect(() => {
		if (selectedProjectId) {
			setSelectedProject(
				projects.filter(
					(project) => project.id === parseInt(selectedProjectId)
				)[0]
			);
		}
	}, [selectedProjectId, projects]);

	// Get all the projects from the server when the page renders for the first time

	useEffect(() => {
		getAllProjects();
		setSelectedProjectId(9)
	}, []);
	return (
		<div className="w-4/5 py-12 px-4 sm:px-6 lg:px-8 flex-auto">
			<div className="text-left justify-between inline-flex items-center gap-2 w-full">
				{/* Project select drop down */}
				<select
				style={{flexShrink: 4}}
					className="flex mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
					value={selectedProjectId}
					onChange={(e) => setSelectedProjectId(e.target.value)}
				>
					{projects.length === 0 ? (
						<option selected disabled>
							No projects
						</option>
					) : (
						<>
							<option value="-1" selected disabled>
								Select a project
							</option>
							{projects.map((project) => (
								<option
									key={`project-dropdown-selector-${project.id}-id`}
									value={project.id}
								>
									{project.title}
								</option>
							))}
						</>
					)}
				</select>
				<div className="flex items-center justify-end gap-2 w-full">
					{/* New project button & popup */}
					<Popup
						overlayStyle={{
							background: "rgba(0,0,0,0.50)",
						}}
						trigger={
							<button className="bg-blue-600 flex text-white font-regular p-1 px-4 rounded shadow hover:bg-blue-700 justify-center gap-1 items-center">
								New project
							</button>
						}
						modal
					>
						{(close) => (
							<div className="flex flex-col justify-center p-5 bg-white overflow-hidden shadow-xl rounded-lg gap-5">
								<div className="flex flex-col gap-1">
									<label className="font-bold" htmlFor="project-title">
										Project Name
									</label>
									<input
										id="project-title"
										className="rounded"
										type="text"
										required
										value={createProjectTitle}
										onChange={(e) => setCreateProjectTitle(e.target.value)}
									/>
								</div>
								<div className="flex justify-around items-center w-full">
									<button
										className="bg-red-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-red-700 flex justify-center gap-1 items-center"
										onClick={() => {
											setCreateProjectTitle("");
											close();
										}}
									>
										Cancel
									</button>
									<button
										className="bg-blue-600 flex text-white font-regular p-1 px-4 rounded shadow hover:bg-blue-700 justify-center gap-1 items-center"
										onClick={() => {
											handleCreateProject();
											close();
										}}
									>
										Create
									</button>
								</div>
							</div>
						)}
					</Popup>
					{/* Action buttons */}
					{selectedProject && (
						<>
							{/* Settings button & Popup */}
							<Popup
								overlayStyle={{
									background: "rgba(0,0,0,0.50)",
								}}
								trigger={
									<button className="bg-gray-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-gray-700 flex justify-center gap-1 items-center">
										<SettingsIcon /> Settings
									</button>
								}
								modal
							>
								{(close) => (
									<div className="flex flex-col justify-center p-5 bg-white overflow-hidden shadow-xl rounded-lg gap-5">
										<p>
											<span className="font-bold">Project Settings: </span>
											{selectedProject.title}
										</p>
										<div className="flex flex-col gap-1">
											<label className="font-bold" htmlFor="new-project-title">
												New Project Title
											</label>
											<input
												id="new-project-title"
												className="rounded"
												type="text"
												required
												value={newProjectTitle}
												onChange={(e) => setNewProjectTitle(e.target.value)}
												placeholder={selectedProject.title}
											/>
										</div>
										<div className="flex justify-around items-center w-full">
											<button
												className="bg-red-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-red-700 flex justify-center gap-1 items-center"
												onClick={() => {
													setNewProjectTitle("");
													close();
												}}
											>
												Cancel
											</button>
											<button
												className="bg-blue-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-blue-700 flex justify-center gap-1 items-center"
												onClick={() => {
													handleUpdateProject();
													close();
												}}
											>
												Save
											</button>
										</div>
									</div>
								)}
							</Popup>
							{/* Delete button & Popup */}
							<Popup
								overlayStyle={{
									background: "rgba(0,0,0,0.50)",
								}}
								trigger={
									<button
										aria-label="delete project"
										className="bg-red-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-red-700 flex justify-center gap-1 items-center"
									>
										<BinIcon />
									</button>
								}
								modal
							>
								{(close) => (
									<div className="flex flex-col justify-center p-5 bg-white overflow-hidden shadow-xl rounded-lg gap-5">
										<p>Are you sure that you want to delete this project?</p>
										<div className="flex justify-around items-center w-full">
											<button
												className="bg-green-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-green-700 flex justify-center gap-1 items-center"
												onClick={() => {
													close();
												}}
											>
												Cancel
											</button>
											<button
												className="bg-red-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-red-700 flex justify-center gap-1 items-center"
												onClick={() => {
													handleDeleteProject();
													close();
												}}
											>
												Delete
											</button>
										</div>
									</div>
								)}
							</Popup>
						</>
					)}
				</div>
			</div>
			<h2 className="my-5 font-bold text-medium">
				{!selectedProject && "Select a project or create one to get started!"}
			</h2>
			{selectedProject && <Board selectedProjectId={selectedProjectId} />}
		</div>
	);
};

export default Kanban;
