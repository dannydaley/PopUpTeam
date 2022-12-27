import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SettingsIcon from "../images/settingsIcon";
import axios from "../lib/axios";
import Popup from "reactjs-popup";
import BinIcon from "../images/binIcon";

const KanbanPage = () => {
	const [projects, setProjects] = useState([]);
	const [createProjectTitle, setCreateProjectTitle] = useState("");
	const [selectedProjectId, setSelectedProjectId] = useState(null);
	const [selectedProject, setSelectedProject] = useState(null);
	const [newProjectTitle, setNewProjectTitle] = useState("");
	const handleDeleteProject = () => {
		axios
			.delete("/project", {
				data: {
					projectId: selectedProjectId,
				},
			})
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
		setSelectedProjectId(-1);
		setSelectedProject(null);
		getAllProjects();
	};
	const handleUpdateProject = () => {
		axios
			.put("/project", {
				projectId: selectedProjectId,
				newProjectTitle: newProjectTitle,
			})
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
		setNewProjectTitle("");
		getAllProjects();
	};
	const handleCreateProject = () => {
		axios
			.post("/project", { projectTitle: createProjectTitle })
			.then((result) => {
				setSelectedProjectId(result.data.data.id);
			})
			.catch((error) => {
				console.log(error);
			});
		setCreateProjectTitle("");
		getAllProjects();
	};
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
	useEffect(() => {
		if (selectedProjectId) {
			setSelectedProject(
				projects.filter(
					(project) => project.id === parseInt(selectedProjectId)
				)[0]
			);
		}
	}, [selectedProjectId, projects]);
	useEffect(() => {
		getAllProjects();
	}, []);
	return (
		<>
			<Helmet>
				<title>
					PopUpTeam - Finding a team made simple for small businesses
				</title>
				<meta
					name="description"
					content="Finding a team made simple for small businesses"
				/>
			</Helmet>
			<Header />
			<div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
				<div className="flex items-center gap-2">
					<select
						className="py-1 rounded font-bold"
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
					<Popup
						overlayStyle={{
							background: "rgba(0,0,0,0.50)",
						}}
						trigger={
							<button className="bg-blue-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-blue-700 flex justify-center gap-1 items-center">
								New project
							</button>
						}
						modal
					>
						{(close) => (
							<div className="flex flex-col justify-center p-5 bg-white overflow-hidden shadow-xl rounded-lg gap-5">
								<div className="flex flex-col gap-1">
									<label htmlFor="project-title">Project Name</label>
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
										className="bg-blue-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-blue-700 flex justify-center gap-1 items-center"
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
					{selectedProject && (
						<>
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
										Settings - {selectedProject.title}
										<div className="flex flex-col gap-1">
											<label htmlFor="project-title">
												Change Project Title
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
							<Popup
								overlayStyle={{
									background: "rgba(0,0,0,0.50)",
								}}
								trigger={
									<button className="bg-red-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-red-700 flex justify-center gap-1 items-center">
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
				<h2 className="my-5 font-bold text-xl">
					{!selectedProject && "Select a project or create one to get started!"}
				</h2>
				<div className="flex gap-5 bg-gray-200 p-5 rounded overflow-auto">
					<div className="flex flex-col gap-2 rounded border border-gray-200 bg-gray-100 px-5 py-3 shadow-md w-273px min-w-273px">
						<h3 className="font-bold text-gray-500">
							Column Name this is a long name
						</h3>
						<div className="flex w-full rounded bg-white px-3 py-2 shadow">
							<p>Task Name</p>
						</div>
						<div className="flex w-full rounded bg-white px-3 py-2 shadow">
							<p>Task Name</p>
						</div>
						<div className="flex w-full rounded bg-white px-3 py-2 shadow">
							<p>Task Name</p>
						</div>
						<div className="flex w-full mt-auto gap-2">
							<button
								aria-label="add new task to column"
								className="bg-blue-600 w-full text-white font-bold p-1 rounded shadow hover:bg-blue-700 flex justify-center gap-1 items-center"
							>
								Add
							</button>
							<button
								className="bg-gray-600 w-full text-white font-bold p-1 rounded shadow hover:bg-gray-700 flex justify-center gap-1 items-center"
								aria-label="column settings"
							>
								<SettingsIcon /> Settings
							</button>
						</div>
					</div>
					<div>
						<button className="bg-gray-50 text-gray-500 font-bold p-2 rounded shadow hover:bg-gray-100 mt-auto flex justify-center gap-1 items-center w-273px min-w-273px">
							Create new column
						</button>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default KanbanPage;
