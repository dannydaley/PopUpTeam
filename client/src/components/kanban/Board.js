import React, { useEffect, useState } from "react";
import axios from "../../lib/axios";
import Popup from "reactjs-popup";
import Column from "./Column";

const Board = ({ selectedProjectId }) => {
	const [createColumnTitle, setCreateColumnTitle] = useState("");
	const [columns, setColumns] = useState([]);

	const handleCreateColumn = () => {
		axios
			.post("/column", {
				columnTitle: createColumnTitle,
				selectedProjectId: selectedProjectId,
			})
			.then((result) => {
				console.log(result);
				getColumns();
			})
			.catch((error) => {
				console.log(error);
			});
		setCreateColumnTitle("");
	};
	const getColumns = () => {
		axios
			.get("/columns", { params: { projectId: selectedProjectId } })
			.then((results) => {
				console.log(results);
				setColumns(results.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	useEffect(() => {
		getColumns();
	}, [selectedProjectId]);
	return (
		<div className="flex gap-5 bg-gray-200 p-5 rounded overflow-auto">
			{columns.map((column) => (
				<Column
					column={column}
					getColumns={getColumns}
					key={`column-key-${column.id}`}
				/>
			))}
			<div>
				<Popup
					overlayStyle={{
						background: "rgba(0,0,0,0.50)",
					}}
					trigger={
						<button className="bg-gray-50 text-gray-500 font-bold p-2 rounded shadow hover:bg-gray-100 mt-auto flex justify-center gap-1 items-center w-273px min-w-273px">
							Create new column
						</button>
					}
					modal
				>
					{(close) => (
						<div className="flex flex-col justify-center p-5 bg-white overflow-hidden shadow-xl rounded-lg gap-5">
							<div className="flex flex-col gap-1">
								<label htmlFor="column-title">Column Title</label>
								<input
									id="column-title"
									className="rounded"
									type="text"
									required
									value={createColumnTitle}
									onChange={(e) => setCreateColumnTitle(e.target.value)}
								/>
							</div>
							<div className="flex justify-around items-center w-full">
								<button
									className="bg-red-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-red-700 flex justify-center gap-1 items-center"
									onClick={() => {
										setCreateColumnTitle("");
										close();
									}}
								>
									Cancel
								</button>
								<button
									className="bg-blue-600 text-white font-bold p-1 px-4 rounded shadow hover:bg-blue-700 flex justify-center gap-1 items-center"
									onClick={() => {
										handleCreateColumn();
										close();
									}}
								>
									Create
								</button>
							</div>
						</div>
					)}
				</Popup>
			</div>
		</div>
	);
};

export default Board;
