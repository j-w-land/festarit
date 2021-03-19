import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Home from "./components/Home";
const Routes = (props) => (
  <Router {...props}>
    <Header></Header>
    <Switch>
      <Route exact path="/">
        <Home isLoggedIn={props.isLoggedIn} setLoggedIn={props.setLoggedIn} />{" "}
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);
export default Routes;
