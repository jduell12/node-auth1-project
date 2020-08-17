import React from "react";
import { Switch, Route, Link } from "react-router-dom";

//components
import { Register } from "./components";

function App() {
  return (
    <div>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <h1>User List</h1>
      <Switch>
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
