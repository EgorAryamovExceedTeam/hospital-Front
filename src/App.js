import { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import "./App.css";
import Registration from "./Hospital/Registration";
import Login from "./Hospital/Login";
import Home from "./Hospital/Home";

function App() {
  return (
    <div className="App">
      <header></header>
      <Switch>
        <Route path="/auth/registration" render={() => <Registration />} />
        <Route path="/auth/login" render={() => <Login />} />
        <Route
          path={"/home"}
          render={() =>
            localStorage.getItem("token") ? (
              <Home />
            ) : (
              <Redirect to="/auth/login" />
            )
          }
        />
        <Redirect from="/" to="/auth/login" />
      </Switch>
    </div>
  );
}

export default App;
