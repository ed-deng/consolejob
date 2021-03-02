import React, { useState, useContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import JobComponent from "./components/JobComponent.jsx";
import { TestContext } from "./state/context";
import Applied from "./components/Applied.jsx";
import InProgress from "./components/InProgress.jsx";
import Completed from "./components/Completed.jsx";
import Saved from "./components/Saved.jsx";
import LoginPage from "./components/LoginPage.jsx";

export default function App() {
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
    <TestContext.Provider>
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
              <Header />
              <div style={{ display: "flex" }}>
                <Applied />
                <InProgress />
                <Completed />
                <Saved />
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </TestContext.Provider>
  );
}
