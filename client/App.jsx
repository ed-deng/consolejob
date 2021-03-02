import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import JobComponent from "./components/JobComponent.jsx";
import { TestContext } from "./state/context";

export default function App() {
  const [test, setTest] = useState(true);

  function toggleTest() {
    if (test === true) {
      setTest((prevTest) => !prevTest);
      console.log(test);
    } else {
      setTest(true);
      console.log(test);
    }
  }

  return (
    <TestContext.Provider value={test}>
      <div>
        <h1>Job Searching</h1>
        <button onClick={toggleTest}>Click me</button>
        <Header />
        <JobComponent />
        <Footer />
      </div>
    </TestContext.Provider>
  );
}
