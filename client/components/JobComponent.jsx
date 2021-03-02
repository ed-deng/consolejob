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
  const [jobz, setJobz] = useState(["Facebookz", "Googz"]);

  return (
    <div>
      Hi there
      <DragDropContext>
        <Droppable droppableId="jobs">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {jobz.map((job, index) => {
                return (
                  <Draggable draggableId={index.toString()} index={index}>
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
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default JobComponent;
