import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {Session} from 'bc-react-session';

import LoginPage from "./js/views/LoginPage";
import LoggedInView from "./js/views/LoggedInView";

class App extends Component {
  render() {
    return(
      <Router>
          <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute path="/" component={LoggedInView}/>
        </Switch>
      </Router>
    )
  }
}

const PrivateRoute = ({component: Component, ...rest}) => {
  const session = Session.get();

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route {...rest} render={props => (
      session.isValid ?
      <Component {...props} />
      : <Redirect to="/login" />
    )} />
  );
};

export default App;
