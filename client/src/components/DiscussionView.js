import React, { Component } from "react";
import DiscussionCard from "./DiscussionCard";
import { CounterArgumentCard } from "./CounterArgumentCard";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import axios from "axios";

export class DiscussionView extends Component {
  constructor() {
    super();
    this.state = {
      discussion: {},
    };
  }

  componentDidMount() {
    this.setState({
      discussion: this.props.location.state.discussion,
    });
  }

  render() {
    console.log(this.props.auth);
    let view = (
      <div className="container">
        <h1>Problem</h1>
      </div>
    );
    if (this.state.discussion.counterArguments !== undefined) {
      view = (
        <div className="container">
          <DiscussionCard discussion={this.state.discussion} />
          {this.state.discussion.counterArguments.map((counterArgument) => (
            <CounterArgumentCard
              key={counterArgument}
              discussion={this.state.discussion._id}
              counterArgument={counterArgument}
              isAuthenticated={this.props.auth.isAuthenticated}
              user={this.props.auth.user.id}
            />
          ))}
        </div>
      );
    }
    return <div>{view}</div>;
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(DiscussionView);
