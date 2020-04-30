import React, {Component} from "react";
import CommentsList from "../components/CommentsList";

var _ = require('lodash');

class SortedCommentsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    }
  }

  componentDidMount() {
    // TODO: remove dummy data json
    let dummyData = require("../../dummy_comments.json").comments;

    /* TODO: setup comments fetching from API
    fetch()
      .then(response => this.setState({ comments: response.comments }));

    */

    let sortedByPlatform = {};
    // generate a list of the available platforms with the comments for each platform
    _.forEach(dummyData, function(comment) {
      if (sortedByPlatform.hasOwnProperty(comment.platform)) {
        sortedByPlatform[comment.platform].push(comment);
      } else {
        sortedByPlatform[comment.platform] = [comment];
      }
    });

    this.setState({comments: sortedByPlatform})
  }

  render() {
    let sortedByPlatformElements = [];
    const sortedComments = this.state.comments;
    _.forEach(sortedComments, function(platform) {
      sortedByPlatformElements.push(<CommentsList comments={platform} name={platform[0].platform} />);
    });

    return (
      <div className="sorted-view">
        {this.state.comments ? sortedByPlatformElements : <p>No comments found.</p>}
      </div>
    )
  }
}

export default SortedCommentsView;
