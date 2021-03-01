import React, { useContext } from "react";
import { TestContext } from "../state/context";

function JobComponent() {
  const test = useContext(TestContext);
  const themeStyle = {
    backgroundColor: test ? "#333" : "#CCC",
    color: test ? "#CCC" : "#333",
    padding: "2rem",
    margin: "2rem",
  };

  return <div style={themeStyle}>Hi there</div>;
}

export default JobComponent;
