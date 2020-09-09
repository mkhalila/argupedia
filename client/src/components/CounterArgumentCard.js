import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import formatDate from "../utils/formatDate";
import summary from "../utils/summary";

export class CounterArgumentCard extends Component {
  constructor() {
    super();
    this.state = {
      discussion: "",
      score: "",
      username: "",
      date: "",
      summary: "",
      criticalQuestion: "",
      scheme: "Argument",
      argument: "",
    };
  }

  componentDidMount() {
    axios
      .get("/api/discussions/counter/id", {
        params: { id: this.props.counterArgument },
      })
      .then((res) => {
        console.log(res.data);
        const ca = res.data;
        this.setState({
          discussion: this.props.discussion,
          score: ca.upvotes.length - ca.downvotes.length,
          username: ca.user,
          date: formatDate(ca.date),
          summary: summary(ca.argument),
          argument: ca.argument._id,
          criticalQuestion: ca.criticalQuestion,
          scheme: ca.argument.kind,
        });
      });
    //   .catch((err) => console.log(err));
  }

  upvote = (e) => {
    e.preventDefault();
    const payload = {
      id: this.props.counterArgument,
      user: this.props.user,
    };
    console.log(payload);
    axios
      .post("api/discussions/counter/upvote", payload)
      .then((res) => {
        this.setState({
          score: res.data.upvotes.length - res.data.downvotes.length,
        });
      })
      .catch((err) => console.log(err));
  };

  downvote = (e) => {
    e.preventDefault();
    const payload = {
      id: this.props.counterArgument,
      user: this.props.user,
    };
    axios
      .post("api/discussions/counter/downvote", payload)
      .then((res) => {
        this.setState({
          score: res.data.upvotes.length - res.data.downvotes.length,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let actions;
    if (this.props.isAuthenticated === false) {
      actions = <div className="card-action"></div>;
    } else {
      actions = (
        <div className="card-action">
          <Link
            className="btn black-text"
            to={{
              pathname: "/attack",
              state: {
                discussion: this.props.discussion,
                argument: this.props.counterArgument,
                scheme: this.state.scheme,
              },
            }}
          >
            <i className="material-icons">question_answer</i>
          </Link>
          <button
            className="btn white black-text"
            style={{ marginLeft: "1rem" }}
            onClick={this.upvote}
          >
            <i className="material-icons">arrow_upward</i>
          </button>
          <button
            className="btn white black-text"
            style={{ marginLeft: "1rem" }}
            onClick={this.downvote}
          >
            <i className="material-icons">arrow_downward</i>
          </button>
        </div>
      );
    }
    const attackers = this.props.attackers(
      this.props.attackRelation,
      this.props.counterArgument
    );
    let attackersDiv;
    if (attackers.length === 0) {
      attackersDiv = <div></div>;
    } else {
      attackersDiv = (
        <div>
          {attackers.map((attacker) => (
            <div style={{ marginLeft: `1rem` }}>
              <CounterArgumentCard
                key={attacker}
                discussion={this.props.discussion}
                counterArgument={attacker}
                isAuthenticated={this.props.isAuthenticated}
                user={this.props.user}
                attackRelation={this.props.attackRelation}
                attackers={this.props.attackers}
              />
            </div>
          ))}
        </div>
      );
    }
    return (
      <div className="col m6 s12">
        <div className="card">
          <div className="card-content">
            <span className="card-title">
              <b>{this.state.score}</b> | <em>{this.state.username}</em>
              <p style={{ fontSize: "60%" }}>{this.state.date}</p>
              <p>
                <em>{this.state.criticalQuestion}</em>
              </p>
            </span>
            <p>{this.state.summary}</p>
          </div>
          {actions}
        </div>
        {attackersDiv}
      </div>
    );
  }
}

// export default DiscussionCard;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(CounterArgumentCard);
