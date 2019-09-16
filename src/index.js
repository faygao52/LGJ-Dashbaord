import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { PrivateRoute } from "components/PrivateRoute";

// Components
import Admin from "layouts/Admin";
import SignIn from 'layouts/SignIn';
import SignUp from 'layouts/SignUp';

import "assets/css/material-dashboard-react.css?v=1.8.0";
import "assets/css/custom.css";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <PrivateRoute path="/admin" component={Admin} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Redirect from="/" to="/admin" />
    </Switch>
  </Router>,
  document.getElementById("root")
);