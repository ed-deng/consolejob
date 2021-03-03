import React, { useReducer } from "react";
import {
  initialCompletedState,
  updateCompletedStateReducer,
} from "../state/reducers";

function Completed() {
  const [completedState, completedDispatch] = useReducer(
    updateCompletedStateReducer,
    initialCompletedState
  );

  return (
    <div style={{ padding: "20px", border: "1px solid black" }}>
      {completedState.tables.map((job) => (
        <li>{job.company}</li>
      ))}
    </div>
  );
}

export default Completed;
