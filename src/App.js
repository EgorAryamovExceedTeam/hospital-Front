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
        <Route path="/auth/registration" component={Registration} />
        <Route path="/auth/login" component={Login} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
