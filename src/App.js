import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import Users from "./components/Users.js";
import Groups from "./components/Groups.js";
import ErrorPage from "./components/ErrorPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            <ul className="RouterHeader">
              <li>
                <Link to="/">Users</Link>
              </li>
              <li>
                <Link to="/groups">Groups</Link>
              </li>
            </ul>

            <hr />
          </header>

          <Switch>
            <Route exact path="/">
              <Users />
            </Route>
            <Route path="/groups">
              <Groups />
            </Route>
            <Route path="/*">
              <ErrorPage />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
