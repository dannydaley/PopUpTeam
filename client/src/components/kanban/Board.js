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
    closestCorners,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import Task from "./Task";

const Board = ({ selectedProjectId }) => {
    const [createColumnTitle, setCreateColumnTitle] = useState("");
    const [columns, setColumns] = useState([]);
    const sortableItemIds = useMemo(
        () => [...columns.map((column) => `column-droppable-${column.id}`)],
        [columns]
    );

    // Dnd stuff starts here

    const [activeDraggedColumnId, setActiveDraggedColumnId] = useState(null);
    const [activeDraggedTaskId, setActiveDraggedTaskId] = useState(null);
    const [activeDroppableColumnId, setActiveDroppableColumnId] =
        useState(null);

    const handleDragStart = (event) => {
        const { active } = event;

        // Move task
        if (active.id.startsWith("task")) {
            setActiveDraggedTaskId(active.id);
            setActiveDroppableColumnId(
                active.data.current.sortable.containerId
            );
        }
        // Move column
        if (active.id.startsWith("column")) {
            setActiveDraggedColumnId(active.id);
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        console.log(event);

        setActiveDraggedColumnId(null);
        setActiveDraggedTaskId(null);
        setActiveDroppableColumnId(null);

        if (active.id !== over.id) {
            // Move task
            if (active.id.startsWith("task") && over.id.startsWith("task")) {
                let tempArray = [...columns];

                const activeContainer =
                    active.data.current.sortable.containerId;
                const overContainer =
                    over.data.current?.sortable.containerId || over.id;

                const activeTaskId = active.id;
                const overTaskId = over.id;

                if (activeContainer === overContainer) {
                    const activeContainerIndex = tempArray
                        .map((column) => column.id)
                        .indexOf(parseInt(activeContainer.split("-")[2]));
                    let columnTempArr = tempArray[activeContainerIndex].content;

                    // Get the column indexes of the item being dragged and item at target location
                    const oldIndex = tempArray[activeContainerIndex].content
                        .map((task) => task.id)
                        .indexOf(parseInt(activeTaskId.split("-")[2]));
                    const newIndex = tempArray[activeContainerIndex].content
                        .map((item) => item.id)
                        .indexOf(parseInt(overTaskId.split("-")[2]));

                    columnTempArr = arrayMove(
                        columnTempArr,
                        oldIndex,
                        newIndex
                    );

                    tempArray[activeContainerIndex].content = columnTempArr;

                    setColumns(tempArray);

                    let newContentOrder = [];
                    newContentOrder.push(columnTempArr.map((item) => item.id));

                    axios
                        .put("/column", {
                            columnId: parseInt(activeContainer.split("-")[2]),
                            newColumnTitle: null,
                            newContent: newContentOrder,
                        })
                        .then((result) => {
                            console.log(result);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }

                return;
            }
            // Move column
            if (
                active.id.startsWith("column") &&
                over.id.startsWith("column")
            ) {
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

                let newContentOrder = [];
                newContentOrder.push(tempArray.map((item) => item.id));

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
        }
    };

    const handleDragCancel = () => {
        setActiveDraggedColumnId(null);
        setActiveDraggedTaskId(null);
        setActiveDroppableColumnId(null);
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
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
            sensors={sensors}
            collisionDetection={closestCorners}
        >
            <div className="flex w-auto gap-5 p-5 rounded overflow-auto">
                <SortableContext
                    items={sortableItemIds}
                    strategy={horizontalListSortingStrategy}
                >
                    {columns.map((column) => (
                        <Column
                            activeDraggedTaskId={activeDraggedTaskId}
                            dragId={`column-droppable-${column.id}`}
                            column={column}
                            getColumns={getColumns}
                            key={`column-key-${column.id}`}
                        />
                    ))}
                </SortableContext>
                <DragOverlay>
                    {activeDraggedColumnId ? (
                        <Column
                            column={
                                columns[
                                    columns
                                        .map((column) => column.id)
                                        .indexOf(
                                            parseInt(
                                                activeDraggedColumnId.split(
                                                    "-"
                                                )[2]
                                            )
                                        )
                                ]
                            }
                            getColumns={getColumns}
                            dragId={activeDraggedColumnId}
                        />
                    ) : null}
                    {activeDraggedTaskId ? (
                        <>
                            <Task
                                dragId={`task-droppable-${activeDraggedTaskId}`}
                                task={
                                    columns[
                                        columns
                                            .map((column) => column.id)
                                            .indexOf(
                                                parseInt(
                                                    activeDroppableColumnId.split(
                                                        "-"
                                                    )[2]
                                                )
                                            )
                                    ].content[
                                        columns[
                                            columns
                                                .map((column) => column.id)
                                                .indexOf(
                                                    parseInt(
                                                        activeDroppableColumnId.split(
                                                            "-"
                                                        )[2]
                                                    )
                                                )
                                        ].content
                                            .map((task) => task.id)
                                            .indexOf(
                                                parseInt(
                                                    activeDraggedTaskId.split(
                                                        "-"
                                                    )[2]
                                                )
                                            )
                                    ]
                                }
                                getColumns={getColumns}
                            />
                        </>
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
                                    <label
                                        className="font-bold"
                                        htmlFor="column-title"
                                    >
                                        Column Title
                                    </label>
                                    <input
                                        id="column-title"
                                        className="rounded"
                                        type="text"
                                        required
                                        value={createColumnTitle}
                                        onChange={(e) =>
                                            setCreateColumnTitle(e.target.value)
                                        }
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
