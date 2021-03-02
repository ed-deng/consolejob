import React, { useState, useContext, useReducer } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import JobComponent from "./components/JobComponent.jsx";
// import { TestContext } from "./state/context";
// import { initialTestContext, updateTestReducer } from "./state/reducers";

export default function App() {
  // const [test, setTest] = useState(true);
  // const [testState, testDispatch] = useReducer(
  //   updateTestReducer,
  //   initialTestContext
  // );

  return (
    <TestContext.Provider value={test}>
      <div>
        <h1>Job Searching</h1>
        <button
        // onClick={() => {
        //   testDispatch({
        //     type: "UPDATE_TEST",
        //   });
        // }}
        >
          Click me
        </button>
        <p>this is dan's work</p>
        <Header />
        <JobComponent />
        <Footer />
      </div>
    </TestContext.Provider>
  );
}
