import React, { useState, useRef, useMemo } from "react";
import SettingsIcon from "../../images/settingsIcon";
import Popup from "reactjs-popup";
import axios from "../../lib/axios";
import BinIcon from "../../images/binIcon";
import {
	rectSortingStrategy,
	SortableContext,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import HoldIcon from "../../images/holdIcon";
import Task from "./Task";
import labelColors from "./labelColors";

const Column = ({ column, getColumns, dragId }) => {
	const [newColumnTitle, setNewColumnTitle] = useState("");
	const [createTaskTitle, setCreateTaskTitle] = useState("");
	const [createTaskDesc, setCreateTaskDesc] = useState("");
	const [createTaskDeadline, setCreateTaskDeadline] = useState("");
	const [createTaskPerson, setCreateTaskPerson] = useState("");
	const [createTaskColor, setCreateTaskColor] = useState(0);
	const optionsPopUp = useRef();
	const sortableItemIds = useMemo(
		() => [...column.content.map((task) => `task-droppable-${task.id}`)],
		[column]
	);

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

	const handleDeleteColumn = () => {
		axios
			.delete("/column", {
				data: {
					columnId: column.id,
				},
			})
			.then((result) => {
				console.log(result);
				getColumns();
			})
			.catch((error) => {
				console.log(error);
			});
		optionsPopUp.current.close();
	};
	const handleUpdateProject = () => {
		axios
			.put("/column", {
				columnId: column.id,
				newColumnTitle: newColumnTitle,
			})
			.then((result) => {
				console.log(result);
			})
			.catch((error) => {
				console.log(error);
			});
		setNewColumnTitle("");
		getColumns();
	};
	const handleCreateTask = () => {
		axios
			.post("/task", {
				taskTitle: createTaskTitle,
				taskDesc: createTaskDesc,
				taskDeadline: createTaskDeadline,
				taskPerson: createTaskPerson,
				taskColor: createTaskColor,
				selectedColumnId: column.id,
			})
			.then((result) => {
				console.log(result);
				getColumns();
			})
			.catch((error) => {
				console.log(error);
			});
		setCreateTaskTitle("");
		setCreateTaskDesc("");
		setCreateTaskDeadline("");
		setCreateTaskPerson("");
		setCreateTaskColor(0);
	};
	return (
		<div
			ref={setNodeRef}
			style={style}
			className="z-10 flex flex-col gap-2 rounded border border-gray-200 bg-gray-100 px-5 py-3 mb-auto shadow-md w-273px min-w-273px"
		>
			<div className="flex justify-between items-center">
				<h3 className="font-bold text-gray-500">{column.title}</h3>
				<div
					className="flex cursor-grab text-gray-500"
					{...attributes}
					{...listeners}
				>
					<HoldIcon className="" />
					<HoldIcon className="-ml-4 -mr-2" />
				</div>
			</div>
			<SortableContext
				id={dragId}
				items={sortableItemIds}
				strategy={rectSortingStrategy}
			>
				{column.content.length > 0 ? (
					column.content.map((task) => (
						<Task
							dragId={`task-droppable-${task.id}`}
							key={`task-key-${task.id}`}
							task={task}
							getColumns={getColumns}
						/>
					))
				) : (
					<p className="text-center font-bold text-gray-400">Empty</p>
				)}
			</SortableContext>
			<div className="flex w-full mt-auto gap-2">
				<Popup
					overlayStyle={{
						background: "rgba(0,0,0,0.50)",
					}}
					trigger={
						<button
							aria-label="add new task to column"
							className="bg-blue-600 w-full text-white font-bold p-1 rounded shadow hover:bg-blue-700 flex justify-center gap-1 items-center"
						>
							Add
						</button>
					}
					modal
				>
					{(close) => (
						<div className="flex flex-col justify-center p-5 bg-white overflow-hidden shadow-xl rounded-lg gap-5">
							<div className="flex flex-col gap-1">
								<label className="font-bold" htmlFor="task-title">
									Task Title
								</label>
								<input
									id="task-title"
									className="rounded"
									type="text"
									value={createTaskTitle}
									onChange={(e) => setCreateTaskTitle(e.target.value)}
								/>
								<label className="font-bold" htmlFor="task-description">
									Task description
								</label>
								<textarea
									id="task-description"
									className="rounded"
									value={createTaskDesc}
									onChange={(e) => setCreateTaskDesc(e.target.value)}
								></textarea>
								<label className="font-bold" htmlFor="task-deadline">
									Task deadline
								</label>
								<input
									id="task-deadline"
									type="date"
									className="rounded"
									value={createTaskDeadline}
									onChange={(e) => setCreateTaskDeadline(e.target.value)}
								/>
								<label className="font-bold" htmlFor="task-person">
									Assigned to
								</label>
								<input
									id="task-person"
									type="text"
									className="rounded"
									value={createTaskPerson}
									onChange={(e) => setCreateTaskPerson(e.target.value)}
								/>
								<label
									className="flex items-center justify-start gap-1 font-bold"
									htmlFor="task-color"
								>
									Task label{" "}
									<div
										className={`w-2 h-2 ${labelColors[createTaskColor]} rounded-full`}
									></div>
								</label>
								<select
									id="task-color"
									type="text"
									className="rounded"
									value={createTaskColor}
									onChange={(e) => setCreateTaskColor(parseInt(e.target.value))}
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
										setCreateTaskTitle("");
										setCreateTaskDesc("");
										setCreateTaskDeadline("");
										setCreateTaskPerson("");
										setCreateTaskColor(0);
										close();
									}}
								>
									Cancel
								</button>
								<button
									className="bg-blue-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-blue-700 flex justify-center gap-1 items-center"
									onClick={() => {
										handleCreateTask();
										close();
									}}
								>
									Create
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
						<button
							className="bg-gray-600 w-full text-white font-bold p-1 rounded shadow hover:bg-gray-700 flex justify-center gap-1 items-center"
							aria-label="column settings"
						>
							<SettingsIcon /> Settings
						</button>
					}
					modal
					nested
					ref={optionsPopUp}
				>
					{(close) => (
						<div className="flex flex-col justify-center bg-white overflow-hidden shadow-xl rounded-lg gap-5">
							<div className="px-5 pt-5">
								<p>
									<span className="font-bold">Column Settings: </span>
									{column.title}
								</p>
							</div>
							<div className="flex flex-col gap-1 px-5">
								<label className="font-bold" htmlFor="new-column-title">
									New Column Title
								</label>
								<input
									id="new-column-title"
									className="rounded"
									type="text"
									required
									value={newColumnTitle}
									onChange={(e) => setNewColumnTitle(e.target.value)}
									placeholder={column.title}
								/>
							</div>
							<div className="flex justify-around items-center w-full flex-col">
								<div className="flex justify-around items-center w-full px-5">
									<button
										className="bg-red-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-red-700 flex justify-center gap-1 items-center"
										onClick={() => {
											setNewColumnTitle("");
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
												<p>Are you sure that you want to delete this column?</p>
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
															handleDeleteColumn();
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
			</div>
		</div>
	);
};

export default Column;
