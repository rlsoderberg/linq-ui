import React, {Component} from "react";
import {Session} from 'bc-react-session';
import $ from "jquery";

class LoginPage extends Component {
  validateForm(e) {
    e.preventDefault(); // prevent form submitting via action

    // make request to backend to validate user
    let username = $("#username").val();
    let password = $("#password").val();


    // need to implement authentication with the backend.

    let dummyConfig = require("../../dummy_config.json");

    Session.start({
      payload: {
        username: username,
        config: dummyConfig
      },
      expiration: 86400000 // in milliseconds, set to 1 day, user can also manually logout
      });
      window.location.href= "/all";
  }

  render() {
    return (
      <div className="login">
        <h1>Linq</h1>
        <form name="login" className="login-form" action="/" onSubmit={this.validateForm}>
          <input type="text" name="username" id="username" placeholder="Username" required autoFocus />
          <input type="password" name="username" id="password" placeholder="Password" required />
          <input type="submit" value="Login" className="login-button"/>
        </form>
      </div>
    )
  }
}

export default LoginPage;
