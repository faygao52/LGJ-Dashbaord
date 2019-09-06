import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// Components
// import Admin from "layouts/Admin";
import SignIn from 'layouts/SignIn';
import SignUp from 'layouts/SignUp';

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/* <Route path="/admin" component={Admin} /> */}
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Redirect from="/" to="/signin" />
    </Switch>
  </Router>,
  document.getElementById("root")
);