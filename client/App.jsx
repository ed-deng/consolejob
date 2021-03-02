import React, { useState, useContext, useReducer } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import JobComponent from "./components/JobComponent.jsx";
import { TestContext } from "./state/context";
import Applied from "./components/Applied.jsx";
import InProgress from "./components/InProgress.jsx";
import Completed from "./components/Completed.jsx";
import Saved from "./components/Saved.jsx";

export default function App() {
  const [test, setTest] = useState(true);
  // const [testState, testDispatch] = useReducer(
  //   updateTestReducer,
  //   initialTestContext
  // );

  /**
   * [
   *  [1,2,3],
   *  [2,5,8],
   *  [84,2,55]
   * ]
   */

  return (
    <TestContext.Provider value={test}>
      <div>
        <Header />
        <div style={{ display: "flex" }}>
          <Applied />
          <InProgress />
          <Completed />
          <Saved />
        </div>
      </div>
    </TestContext.Provider>
  );
}

/*
import React, { useState, useContext, useReducer } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import JobComponent from './components/JobComponent.jsx';
import { TestContext } from './state/context';
import LoginPage from './components/LoginPage.jsx';
// import { initialTestContext, updateTestReducer } from "./state/reducers";

export default function App() {
  const [test, setTest] = useState(true);

  <Router>
  <div>
    <li>
      <Link to="/loginpage">Login</Link>
    </li>
    <li>
      <Link to="/">Home</Link>
    </li>
  </div>
  <Switch>
    <Route exact path="/">
      <Redirect to="/loginpage" />
    </Route>
    <Route path="/loginpage">
      <LoginPage />
    </Route>
    <Route path="/board">
      <div>
        <h1>Job Searching</h1>
        <button>Click me</button>
        <p>this is dan's work</p>
        <Header />
        <JobComponent />
        <Footer />
      </div>
    </Route>
  </Switch>
</Router>

*/
