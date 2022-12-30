import React, { useEffect, useMemo, useState } from "react";
import axios from "../../lib/axios";
import Popup from "reactjs-popup";
import Column from "./Column";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	horizontalListSortingStrategy,
	arrayMove,
} from "@dnd-kit/sortable";

const Board = ({ selectedProjectId }) => {
	const [createColumnTitle, setCreateColumnTitle] = useState("");
	const [columns, setColumns] = useState([]);
	const sortableItemIds = useMemo(
		() => columns.map((column) => `column-droppable-${column.id}`),
		[columns]
	);

	// Dnd stuff starts here

	const [activeDraggedId, setActiveDraggedId] = useState(null);

	const handleDragStart = (event) => {
		const { active } = event;
		setActiveDraggedId(active.id);
	};

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			let tempArray = [...columns];

			// Get the column indexes of the item being dragged and item at target location
			const oldIndex = tempArray
				.map((item) => item.id)
				.indexOf(parseInt(active.id.split("-")[2]));
			const newIndex = tempArray
				.map((item) => item.id)
				.indexOf(parseInt(over.id.split("-")[2]));

			// Swap the items in the array
			tempArray = arrayMove(tempArray, oldIndex, newIndex);

			// Update state
			setColumns(tempArray);

			// TODO: Update server with new data

			let newContentOrder = [];
			newContentOrder.push(tempArray.map((item) => item.id));

			console.log(newContentOrder);

			axios
				.put("/project", {
					projectId: selectedProjectId,
					newProjectTitle: null,
					newContent: newContentOrder,
				})
				.then((result) => {
					console.log(result);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	// Dnd stuff ends here

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
		<DndContext
			onDragStart={handleDragStart}
			onDragOver={handleDragEnd}
			sensors={sensors}
			collisionDetection={closestCenter}
		>
			<div className="flex gap-5 bg-gray-200 p-5 rounded overflow-auto">
				<SortableContext
					items={sortableItemIds}
					strategy={horizontalListSortingStrategy}
				>
					{columns.map((column) => (
						<Column
							dragId={`column-droppable-${column.id}`}
							column={column}
							getColumns={getColumns}
							key={`column-key-${column.id}`}
						/>
					))}
				</SortableContext>
				<DragOverlay>
					{activeDraggedId ? (
						<Column
							column={
								columns[
									columns
										.map((column) => column.id)
										.indexOf(parseInt(activeDraggedId.split("-")[2]))
								]
							}
							getColumns={getColumns}
							dragId={activeDraggedId}
						/>
					) : null}
				</DragOverlay>
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
									<label className="font-bold" htmlFor="column-title">
										Column Title
									</label>
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
		</DndContext>
	);
};

export default Board;
