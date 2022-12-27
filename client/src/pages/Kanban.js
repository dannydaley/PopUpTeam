import React, { useEffect } from "react";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AddIcon from "../images/addIcon";
import SettingsIcon from "../images/settingsIcon";
import axios from "../lib/axios";

const KanbanPage = () => {
	useEffect(() => {
		axios
			.get("/get-projects")
			.then((results) => {
				console.log(results);
			})
			.catch((error) => {
				console.log(error);
			});
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
								<AddIcon /> Add
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
