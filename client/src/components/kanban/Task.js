import React, { useEffect, useRef, useState } from "react";
import HoldIcon from "../../images/holdIcon";
import Popup from "reactjs-popup";
import labelColors from "./labelColors";
import BinIcon from "../../images/binIcon";
import SettingsIcon from "../../images/settingsIcon";
import axios from "../../lib/axios";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Task = ({ task, getColumns, dragId }) => {
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [newTaskDesc, setNewTaskDesc] = useState("");
	const [newTaskDeadline, setNewTaskDeadline] = useState("");
	const [newTaskPerson, setNewTaskPerson] = useState("");
	const [newTaskColor, setNewTaskColor] = useState(0);
	const taskPopUp = useRef();

	//Dnd Stuff starts here

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: dragId });
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	//Dnd Stuff ends here

	const handleUpdateTask = async () => {
		axios
			.put("/task", {
				taskId: task.id,
				newTaskTitle: newTaskTitle,
				newTaskDesc: newTaskDesc,
				newTaskDeadline: newTaskDeadline,
				newTaskPerson: newTaskPerson,
				newTaskColor: newTaskColor,
			})
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
		await getColumns();
		setNewTaskTitle(task.title);
		setNewTaskDesc(task.desc);
		setNewTaskDeadline(task.deadline ? task.deadline.split("T")[0] : "");
		setNewTaskPerson(task.person);
		setNewTaskColor(task.color);
		taskPopUp.current.close();
	};

	const handleDeleteTask = () => {
		axios
			.delete("/task", {
				data: {
					taskId: task.id,
				},
			})
			.then((result) => {
				console.log(result);
				getColumns();
			})
			.catch((error) => {
				console.log(error);
			});

		taskPopUp.current.close();
	};

	useEffect(() => {
		setNewTaskTitle(task.title);
		setNewTaskDesc(task.desc);
		setNewTaskDeadline(task.deadline ? task.deadline.split("T")[0] : "");
		setNewTaskPerson(task.person);
		setNewTaskColor(task.color);
	}, [task]);

	return (
		<div
			ref={setNodeRef}
			style={style}
			className="flex items-center justify-between w-full rounded bg-white px-3 py-2 shadow group"
		>
			<Popup
				overlayStyle={{
					background: "rgba(0,0,0,0.50)",
				}}
				trigger={
					<div className="flex items-center gap-3 w-full cursor-pointer">
						<div>
							<div
								className={`w-2 h-2 rounded ${labelColors[task.color]}`}
							></div>
						</div>
						<p>{task.title}</p>
					</div>
				}
				modal
				nested
				ref={taskPopUp}
			>
				{(close) => (
					<div className="flex flex-col justify-center bg-white overflow-hidden shadow-xl rounded-lg gap-5 max-w-2xl">
						<div className="px-5 pt-5 flex items-center gap-2">
							<p className="flex justify-start items-center gap-1">
								<span className="font-bold">Task: </span>
								<span className="flex justify-start items-center gap-2">
									{task.title}
								</span>
							</p>
							<div>
								<div
									className={`w-2 h-2 rounded ${labelColors[task.color]}`}
								></div>
							</div>
						</div>
						{task.deadline || task.person || task.desc ? (
							<div className="flex flex-col gap-1">
								{task.deadline && (
									<div className="px-5 flex justify-between items-center gap-2">
										<p className="font-bold text-gray-500 text-sm">Deadline</p>
										<p className="text-sm">
											{new Date(task.deadline).toLocaleString("default", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</p>
									</div>
								)}
								{task.person && (
									<div className="px-5 flex justify-between items-center gap-2">
										<p className="font-bold text-gray-500 text-sm">
											Assigned to
										</p>
										<p className="text-sm">{task.person}</p>
									</div>
								)}
								{task.desc && (
									<div>
										<p className="bg-gray-100 px-5 py-2">{task.desc}</p>
									</div>
								)}
							</div>
						) : (
							""
						)}

						<div className="flex justify-around items-center w-full flex-col">
							<div className="flex justify-around items-center w-full px-5 gap-2">
								<button
									className="bg-red-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-red-700 flex justify-center gap-1 items-center"
									onClick={() => {
										close();
									}}
								>
									Close
								</button>
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
											<div>
												<p>
													<span className="font-bold">Task Settings: </span>
													{task.title}
												</p>
											</div>
											<div className="flex flex-col gap-1">
												<label className="font-bold" htmlFor="task-title">
													Task Title
												</label>
												<input
													id="task-title"
													className="rounded"
													type="text"
													value={newTaskTitle}
													onChange={(e) => setNewTaskTitle(e.target.value)}
												/>
												<label className="font-bold" htmlFor="task-description">
													Task description
												</label>
												<textarea
													id="task-description"
													className="rounded"
													value={newTaskDesc}
													onChange={(e) => setNewTaskDesc(e.target.value)}
												></textarea>
												<label className="font-bold" htmlFor="task-deadline">
													Task deadline
												</label>
												<input
													id="task-deadline"
													type="date"
													className="rounded"
													value={newTaskDeadline}
													onChange={(e) => setNewTaskDeadline(e.target.value)}
												/>
												<label className="font-bold" htmlFor="task-person">
													Assigned to
												</label>
												<input
													id="task-person"
													type="text"
													className="rounded"
													value={newTaskPerson}
													onChange={(e) => setNewTaskPerson(e.target.value)}
												/>
												<label
													className="flex items-center justify-start gap-1 font-bold"
													htmlFor="task-color"
												>
													Task label{" "}
													<div
														className={`w-2 h-2 ${labelColors[newTaskColor]} rounded-full`}
													></div>
												</label>
												<select
													id="task-color"
													type="text"
													className="rounded"
													value={newTaskColor}
													onChange={(e) =>
														setNewTaskColor(parseInt(e.target.value))
													}
												>
													<option value={0}>None</option>
													<option value={1}>Green</option>
													<option value={2}>Orange</option>
													<option value={3}>Red</option>
													<option value={4}>Blue</option>
													<option value={5}>Purple</option>
													<option value={6}>Gray</option>
												</select>
											</div>
											<div className="flex justify-around items-center w-full">
												<button
													className="bg-red-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-red-700 flex justify-center gap-1 items-center"
													onClick={() => {
														setNewTaskTitle(task.title);
														setNewTaskDesc(task.desc);
														setNewTaskDeadline(
															task.deadline ? task.deadline.split("T")[0] : ""
														);
														setNewTaskPerson(task.person);
														setNewTaskColor(task.color);
														close();
													}}
												>
													Cancel
												</button>
												<button
													className="bg-blue-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-blue-700 flex justify-center gap-1 items-center"
													onClick={() => {
														handleUpdateTask();
														close();
													}}
												>
													Save
												</button>
											</div>
										</div>
									)}
								</Popup>
							</div>
							<div className="flex justify-around items-center w-full flex-col mt-5 bg-red-100 px-5 py-3 gap-2 border-t border-red-200">
								<Popup
									overlayStyle={{
										background: "rgba(0,0,0,0.50)",
									}}
									trigger={
										<button
											aria-label="delete column"
											className="bg-red-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-red-700 flex justify-center gap-1 items-center"
										>
											<BinIcon />
										</button>
									}
									modal
								>
									{(close) => (
										<div className="flex flex-col justify-center p-5 bg-white overflow-hidden shadow-xl rounded-lg gap-5">
											<p>Are you sure that you want to delete this task?</p>
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
														handleDeleteTask();
														close();
													}}
												>
													Delete
												</button>
											</div>
										</div>
									)}
								</Popup>
							</div>
						</div>
					</div>
				)}
			</Popup>
			<div
				{...attributes}
				{...listeners}
				className="flex cursor-grab text-gray-500 opacity-0 group-hover:opacity-100"
			>
				<HoldIcon className="" />
				<HoldIcon className="-ml-4 -mr-2" />
			</div>
		</div>
	);
};

export default Task;
