import React, { useState, useReducer, useEffect, useLayoutEffect } from "react";
import { columns, columnsReducer } from "../state/reducers";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import NewJobModal from "./NewJobModal.jsx";

const onDragEnd = (result, jobColumn, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = jobColumn[source.droppableId];
    const destColumn = jobColumn[destination.droppableId];
    console.log(destColumn);
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...jobColumn,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
    // console.log(jobColumn);
    const info = {
      status: destColumn.name,
    };

    fetch(`/jobs/edit/${result.draggableId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
  } else {
    const column = jobColumn[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...jobColumn,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
  // console.log(jobColumn);
};

function Board({ userInfo }) {
  const [jobColumn, setColumns] = useState(columns);
  const [showModal, updateShowModal] = useState(false);

  const deleteCard = (cardId, status) => {
    fetch(`jobs/delete/${cardId}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        const newJobColumn = JSON.parse(JSON.stringify(jobColumn));
        if (status === "Applied")
          newJobColumn[1].items = newJobColumn[1].items.filter(
            (job) => job._id !== cardId
          );
        else if (status === "In Progress")
          newJobColumn[2].items = newJobColumn[2].items.filter(
            (job) => job._id !== cardId
          );
        else if (status === "Completed")
          newJobColumn[3].items = newJobColumn[3].items.filter(
            (job) => job._id !== cardId
          );
        else if (status === "Saved")
          newJobColumn[4].items = newJobColumn[4].items.filter(
            (job) => job._id !== cardId
          );
        setColumns(newJobColumn);
      }
    });
  };

  useEffect(() => {
    if (!userInfo._id) return;
    fetch(`/jobs/${userInfo._id}`, { headers: { "cache-control": "no-cache" } })
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((parsedData) => {
        console.log("parsedData: ", parsedData);
        const newJobColumn = JSON.parse(JSON.stringify(columns));
        parsedData.jobs.forEach((job) => {
          if (job.status === "Applied") newJobColumn[1].items.push(job);
          else if (job.status === "In Progress")
            newJobColumn[2].items.push(job);
          else if (job.status === "Completed") newJobColumn[3].items.push(job);
          else if (job.status === "Saved") newJobColumn[4].items.push(job);
        });
        setColumns(newJobColumn);
        console.log("just called setColumns: ", jobColumn);
      });
  }, [userInfo]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <button
        onClick={() => updateShowModal(!showModal)}
        style={{ width: "4rem", height: "3rem" }}
      >
        Add New
      </button>
      {showModal ? (
        <NewJobModal
          userInfo={userInfo}
          updateShowModal={updateShowModal}
          jobColumn={jobColumn}
          setColumns={setColumns}
        />
      ) : (
        <div></div>
      )}
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, jobColumn, setColumns)}
      >
        {Object.entries(jobColumn).map(([id, column]) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "white" }}>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={id} key={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item._id}
                              draggableId={`${item._id}`}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                if (column.name === "Applied") {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#a1cae2",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.company}
                                      <div>
                                        <button>View card</button>
                                        <button
                                          onClick={() =>
                                            deleteCard(item._id, column.name)
                                          }
                                        >
                                          Delete card
                                        </button>
                                      </div>
                                    </div>
                                  );
                                } else if (column.name === "In Progress") {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#d98124"
                                          : "#f69e7b",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.company}
                                      <div>
                                        <button>View card</button>
                                        <button
                                          onClick={() =>
                                            deleteCard(item._id, column.name)
                                          }
                                        >
                                          Delete card
                                        </button>
                                      </div>
                                    </div>
                                  );
                                } else if (column.name === "Completed") {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#164d08"
                                          : "#70af85",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.company}
                                      <div>
                                        <button>View card</button>
                                        <button
                                          onClick={() =>
                                            deleteCard(item._id, column.name)
                                          }
                                        >
                                          Delete card
                                        </button>
                                      </div>
                                    </div>
                                  );
                                } else if (column.name === "Saved") {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#964259"
                                          : "#cd5d7d",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.company}
                                      <div>
                                        <button>View card</button>
                                        <button
                                          onClick={() =>
                                            deleteCard(item._id, column.name)
                                          }
                                        >
                                          Delete card
                                        </button>
                                      </div>
                                    </div>
                                  );
                                }
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Board;
