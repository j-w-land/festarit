import React, { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Home from "./components/Home";
import Presentation from "./components/presentation/Presentation";

const Routes = (props) => {
  const [presentation, setPresentation] = useState(false);

  return (
    <Router {...props}>
      <Header
        presentation={presentation}
        setPresentation={setPresentation}
      ></Header>
      {presentation === true ? (
        <Presentation
          presentation={presentation}
          setPresentation={setPresentation}
        ></Presentation>
      ) : null}
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
};
export default Routes;
