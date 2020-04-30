import React, {Component} from "react";
import {Session} from 'bc-react-session';

class LoginPage extends Component {
  validateForm(e) {
    e.preventDefault(); // prevent form submitting via action

    // make request to backend to validate user
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // need to implement authentication with the backend.

    Session.start({
      payload: {
        username: username,
        password: password
      },
      expiration: 600000 // in milliseconds, set to ten minutes. user can also manually logout
      });
      window.location.href= "/";
  }

  render() {
    return (
      <div>
        <h1>Linq</h1>
        <form name="login" action="/" onSubmit={this.validateForm}>
          <input type="text" name="username" id="username" placeholder="Username" required autoFocus />
            <input type="password" name="username" id="password" placeholder="Password" required />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default LoginPage;
