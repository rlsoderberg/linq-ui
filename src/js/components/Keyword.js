import React, {Component} from "react";
import $ from "jquery";
import Switch from "react-switch";

import Response from "./Response";

var _ = require("lodash");

class Keyword extends Component {

  constructor(props) {
    super(props);
    const responses = this.props.keyword.responses;

    this.state = {
      responses: responses,
      autoreply: this.props.keyword.autoreply,
      showAddResponse: false
    }

    this.toggleAutoreply = this.toggleAutoreply.bind(this);
    this.handleAddResponseOpen = this.handleAddResponseOpen.bind(this);
    this.handleAddResponseClose = this.handleAddResponseClose.bind(this);
    this.addResponse = this.addResponse.bind(this);
    this.deleteResponse = this.deleteResponse.bind(this);
  }

  toggleAutoreply() {
    let newAutoreply = !this.state.autoreply;

    this.setState({autoreply: newAutoreply });
    this.props.handleAutoreplyToggle(this.props.keyword, newAutoreply);
    this.props.setUnsavedChanges();
  }

  addResponse() {
    let responsesList = this.state.responses;
    const thisComp = this;
    const responseInput = $("#new-response").val();

    if (responseInput.length < 1) {
      alert("The response must be at least 1 character long.");
      return;
    }

    let foundDuplicate = false;
    _.forEach(responsesList, function(r) {
      if (r === responseInput) {
        alert("The response you are trying to add already exists.");
        foundDuplicate = true;
        return false;
      }
    })

    if (foundDuplicate) return;

    responsesList.push(responseInput);
    this.setState({responses: responsesList });
    this.handleAddResponseClose();
    thisComp.props.setUnsavedChanges();
  }

  deleteKeyword = () => {
    this.props.handleDeleteKeyword(this.props.keyword);
  }

  deleteResponse(response) {
    let responses = this.state.responses;
    _.remove(responses, function(n) {
      return n === response;
    });
    this.setState({ responses: responses });
    this.props.setUnsavedChanges();
  }

  handleAddResponseOpen() {
    this.setState({ showAddResponse: true });
  }

  handleAddResponseClose() {
    this.setState({ showAddResponse: false });
  }

  render() {
    const responses = this.state.responses;
    const keyword = this.props.keyword;
    const thisComp = this;
    const responsesList = responses.map(function(r) {
      return (
        <Response response={r} key={r} deleteResponse={thisComp.deleteResponse}/>
      )
    })

    let addResponseElement;
    if (this.state.showAddResponse) {
      addResponseElement =
        <div className="add-response">
          <input type="text" id="new-response" placeholder="Add Response"></input>
            <button onClick={this.addResponse}>Create</button>
            <button onClick={this.handleAddResponseClose}>Cancel</button>
        </div>
    } else {
      addResponseElement = <button className="add-response-button" onClick={this.handleAddResponseOpen}><small>Add Response</small></button>
    }

    return(
      <div className="keyword">
        <div className="keyword-top">
          <h4>{"\"" + keyword.keyword + "\"" }</h4>
          <div className="keyword-top-right">
            <div className="autoreply">
              <p>Auto-Reply?</p>
              <Switch onChange={this.toggleAutoreply} checked={this.state.autoreply} />
            </div>
            <button className="delete-keyword" onClick={this.deleteKeyword}><img src="./img/trash.png" alt="trash icon"></img></button>
          </div>
        </div>
        {responsesList}

        {addResponseElement}
      </div>
    )
  }
}

export default Keyword;
