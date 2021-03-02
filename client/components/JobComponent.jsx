import React, { useContext, useState } from "react";
import { TestContext } from "../state/context";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function JobComponent() {
  // const test = useContext(TestContext);
  // const themeStyle = {
  //   backgroundColor: test ? "#333" : "#CCC",
  //   color: test ? "#CCC" : "#333",
  //   padding: "2rem",
  //   margin: "2rem",
  // };
  const [jobz, setJobz] = useState(["Facebookz", "Googz", "Spotify"]);
  const [stuff, setStuff] = useState(jobz);

  function handleOnDragEnd(result) {
    const items = Array.from(jobz);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setStuff(items);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="jobs">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              Hi there
              {stuff.map((job, index) => {
                return (
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
                        <p>{job}</p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default JobComponent;
