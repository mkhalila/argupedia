import React, { Component } from "react";
import DiscussionCard from "./DiscussionCard";

export class DiscussionView extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      date: "",
      upvotes: [],
      downvotes: [],
      argument: "",
      counterArguments: [],
      attackRelation: [],
      errors: {},
    };
  }

  render() {
    return (
      <div className="container">
        <DiscussionCard
          discussion={this.props.location.state.discussion}
          cardActions={this.props.location.state.cardActions}
        />
      </div>
    );
  }
}

export default DiscussionView;
