import React, { useReducer, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  initialAppliedState,
  updateAppliedStateReducer,
} from "../state/reducers";

function Applied() {
  const [appliedState, appliedDispatch] = useReducer(
    updateAppliedStateReducer,
    initialAppliedState
  );
  const [jobCards, updateJobCards] = useState(appliedState);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(jobCards.tables);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateJobCards({ tables: items });
  }
  return (
    <div style={{ padding: "20px", border: "1px solid black" }}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="jobCards">
          {(provided) => (
            <ul
              className="Job-Card-Container"
              style={{
                width: 250,
                height: 250,
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {jobCards.tables.map((job, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {job.company}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Applied;
