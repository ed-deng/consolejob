import React, { useReducer } from "react";
import {
  initialAppliedState,
  updateAppliedStateReducer,
} from "../state/reducers";

function Applied() {
  const [appliedState, appliedDispatch] = useReducer(
    updateAppliedStateReducer,
    initialAppliedState
  );

  return (
    <div style={{ padding: "20px", border: "1px solid black" }}>
      {appliedState.tables.map((job) => (
        <li>{job.company}</li>
      ))}
    </div>
  );
}

export default Applied;
