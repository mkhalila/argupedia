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
      display: [],
    };
  }

  componentDidMount() {
    this.setState(
      {
        discussion: this.props.location.state.discussion,
      },
      () => {
        const discussionArgument = this.state.discussion.argument;
        const attackRelation = this.state.discussion.attackRelation;
        const display = this.attackersOfVictim(
          attackRelation,
          discussionArgument
        );
        console.log(display);
        this.setState({ display });
      }
    );
  }

  attackersOfVictim = (attackRelation, victim) => {
    const attackers = Object.keys(attackRelation);
    const attackersOf = [];
    for (let i = 0; i < attackers.length; ++i) {
      const attacker = attackers[i];
      const v = attackRelation[attacker];
      if (v === victim) {
        attackersOf.push(attacker);
      }
    }
    return attackersOf;
  };

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
          {this.state.display.map((counterArgument) => (
            <div style={{ marginLeft: `1rem` }}>
              <CounterArgumentCard
                key={counterArgument}
                discussion={this.state.discussion._id}
                counterArgument={counterArgument}
                isAuthenticated={this.props.auth.isAuthenticated}
                user={this.props.auth.user.id}
                attackRelation={this.state.discussion.attackRelation}
                attackers={this.attackersOfVictim}
              />
            </div>
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
