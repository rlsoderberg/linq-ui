import React, {Component} from "react";

import CommentsList from "../components/CommentsList";

class AllCommentsView extends Component {
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

    this.setState({ comments: dummyData });
  }

  render() {
    const comments = this.state.comments;
    const commentsList = <CommentsList comments={comments} />

    return(
      <div className="all-view">
      {comments ? commentsList: <p>No comments found.</p>}
      </div>
    )
  }
}

export default AllCommentsView;
