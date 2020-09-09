import React, { Component } from "react";
import DiscussionCard from "./DiscussionCard";
import { CounterArgumentCard } from "./CounterArgumentCard";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

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

  componentDidMount() {
    // const discussion = this.props.location.state.discussion;
  }

  render() {
    const discussion = this.props.location.state.discussion;
    console.log(this.props.auth);
    return (
      <div className="container">
        <DiscussionCard discussion={discussion} />
        {discussion.counterArguments.map((counterArgument) => (
          <CounterArgumentCard
            key={counterArgument}
            discussion={discussion._id}
            counterArgument={counterArgument}
            isAuthenticated={this.props.auth.isAuthenticated}
            user={this.props.auth.user.id}
          />
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(DiscussionView);
