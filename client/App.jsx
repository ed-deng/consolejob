import React, { useState, useEffect } from "react";
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
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetch("/user", {
      headers: { "cache-control": "no-cache" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, []);

  return (
    <TestContext.Provider>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/loginpage" />
          </Route>
          <Route path="/loginpage">
            <LoginPage />
          </Route>
          <Route path="/board">
            <div>
              <Header userInfo={userInfo} />
              <Board userInfo={userInfo} />
            </div>
          </Route>
        </Switch>
      </Router>
    </TestContext.Provider>
  );
}
