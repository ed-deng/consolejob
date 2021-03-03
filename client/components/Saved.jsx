import React, { useReducer } from "react";
import { initialSavedState, updateSavedStateReducer } from "../state/reducers";

function Saved() {
  const [savedState, savedDispatch] = useReducer(
    updateSavedStateReducer,
    initialSavedState
  );

  return (
    <div style={{ padding: "20px", border: "1px solid black" }}>
      {savedState.tables.map((job) => (
        <li>{job.company}</li>
      ))}
    </div>
  );
}

export default Saved;
