import React, { useState, useContext, useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import JobComponent from './components/JobComponent.jsx';
import { TestContext } from './state/context';
import LoginPage from './components/LoginPage.jsx';
// import { initialTestContext, updateTestReducer } from "./state/reducers";

export default function App() {
  const [test, setTest] = useState(true);

  return (
    <TestContext.Provider value={test}>
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
          <Route path="/loginpage">
            <LoginPage />
          </Route>
          <Route path="/">
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
    </TestContext.Provider>
  );
}
