import React, { useState, useRef } from "react";
import SettingsIcon from "../../images/settingsIcon";
import Popup from "reactjs-popup";
import axios from "../../lib/axios";
import BinIcon from "../../images/binIcon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import HoldIcon from "../../images/holdIcon";

const Column = ({ column, getColumns, dragId }) => {
	const [newColumnTitle, setNewColumnTitle] = useState("");
	const optionsPopUp = useRef();

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
	return (
		<div
			ref={setNodeRef}
			style={style}
			className="z-10 flex flex-col gap-2 rounded border border-gray-200 bg-gray-100 px-5 py-3 shadow-md w-273px min-w-273px"
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
								<label htmlFor="new-column-title">New Column Title</label>
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
