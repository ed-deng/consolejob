import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import { TestContext } from "./state/context";
import LoginPage from "./components/LoginPage.jsx";
import Board from "./components/Board.jsx";

export default function App() {
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
              <Board />
            </div>
          </Route>
        </Switch>
      </Router>
    </TestContext.Provider>
  );
}
