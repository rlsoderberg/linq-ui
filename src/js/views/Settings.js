import React, {Component} from "react";
import {Session} from "bc-react-session";

import KeywordsConfigList from "../components/KeywordsConfigList";

class Settings extends Component {

  constructor(props) {
    super(props);
    this.closeSettings = this.closeSettings.bind(this);
  }

  closeSettings() {
    this.props.closeSettings();
  }

  render() {
    const {payload} = Session.get();

    return(
      <div className="settings-container">
        <button className="close-settings" onClick={this.closeSettings}>x</button>
        <KeywordsConfigList />
      </div>
    )
  }
}

export default Settings;
