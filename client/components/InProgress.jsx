import React, { useReducer } from "react";
import {
  initialInProgressState,
  updateInProgressStateReducer,
} from "../state/reducers";

function InProgress() {
  const [inProgressState, inProgressDispatch] = useReducer(
    updateInProgressStateReducer,
    initialInProgressState
  );

  return (
    <div style={{ padding: "20px", border: "1px solid black" }}>
      {inProgressState.tables.map((job) => (
        <li>{job.company}</li>
      ))}
    </div>
  );
}

export default InProgress;
