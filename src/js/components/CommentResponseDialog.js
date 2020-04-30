import React, {Component} from "react";
import {Session} from 'bc-react-session';
import Highlighter from "react-highlight-words";

var _ = require("lodash");

class CommentResponseDialog extends Component {

  constructor(props) {
    super(props);

    this.closeDialog = this.closeDialog.bind(this);
  }

  sendResponse(event) {
    const buttonId = event.target.id;
    console.log(buttonId);

    // handle sending response to comment
  }

  closeDialog() {
    this.props.closeDialog();
  }

  render() {
    const thisComp = this;

    const comment = this.props.comment;
    const commentKeywords = comment.keywords;

    const { payload } = Session.get();
    const keywordConfig = payload.config.keywords;

    const responses = keywordConfig.map(function(k) {
      if (_.includes(commentKeywords, k.keyword)) {
        return (
          <div key={k.keyword}>
            <h4>"{k.keyword}" Responses</h4>
            <div>
              {k.responses.map(function(response) {
                return (
                  <div className="response-contaner">
                    <button className="response-button" key={response} onClick={thisComp.sendResponse}>{response}</button><br />
                  </div>
                )
              })}
            </div>
          </div>
        )
      } else return null;
    })

    return (
      <div className="response-dialog">
        <div className="dialog-left">
          <button onClick={this.closeDialog} className="comment-dialog-close">x</button>
          <h2>{comment.username}</h2>
          <Highlighter
            highlightTag={ContrastHighlight}
            searchWords={commentKeywords}
            autoEscape={true}
            textToHighlight={comment.commentText}
            className="comment-dialog-text"
            />
          <br />
          <small>{comment.timestamp}</small>
        </div>
        <div className="dialog-right">
          <h3>Responses</h3>
          <small className="comment-dialog-timestamp">Click to respond.</small>
          <div className="responses-list">
          {responses}
          </div>
        </div>
      </div>
    )
  }
}

const ContrastHighlight = ({ children, highlightedIndex }) => (
  <span className="contrast-highlight">{children}</span>
)

export default CommentResponseDialog;
