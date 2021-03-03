import React, { useState, useContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import { TestContext } from "./state/context";
import Applied from "./components/Applied.jsx";
import InProgress from "./components/InProgress.jsx";
import Completed from "./components/Completed.jsx";
import Saved from "./components/Saved.jsx";
import LoginPage from "./components/LoginPage.jsx";
import { columns, columnsReducer } from "./state/reducers";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function App() {
  const [prevJobColumn, prevJobDispatch] = useReducer(columnsReducer, columns);
  const [jobColumn, setColumns] = useState(prevJobColumn);

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
                <DragDropContext>
                  {Object.entries(jobColumn).map(([id, column]) => {
                    return (
                      <Droppable droppableId={id}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                background: snapshot.isDraggingOver
                                  ? "lightblue"
                                  : "lightgrey",
                                padding: 4,
                                width: 250,
                                minHeight: 500,
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={index}
                                    draggableId={index.toString()}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            userSelect: "none",
                                            padding: 16,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#263B4A"
                                              : "#456C86",
                                            color: "white",
                                            ...provided.draggableProps.style,
                                          }}
                                        ></div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                            </div>
                          );
                        }}
                      </Droppable>
                    );
                  })}
                </DragDropContext>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </TestContext.Provider>
  );
}

/*
                    <Applied />
                    <InProgress />
                    <Completed />
                    <Saved />

                              <button
                                onClick={() => {
                                  console.log(column.items);
                                }}
                              ></button>
*/
