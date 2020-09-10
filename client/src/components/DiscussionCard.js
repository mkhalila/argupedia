import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import formatDate from "../utils/formatDate";
import summary from "../utils/summary";

export class DiscussionCard extends Component {
  constructor() {
    super();
    this.state = {
      discussion: "",
      score: "",
      username: "",
      date: "",
      summary: "",
      statComments: 0,
      scheme: "Argument",
    };
  }

  componentDidMount() {
    axios
      .get("/api/discussions/id", { params: { id: this.props.discussion._id } })
      .then((res) => {
        const discussion = res.data;
        const {
          upvotes,
          downvotes,
          date,
          user,
          argument,
          counterArguments,
        } = discussion;
        this.setState({
          score: upvotes.length - downvotes.length,
          date: formatDate(date),
          username: user.name,
          summary: summary(argument),
          statComments: counterArguments.length,
          scheme: argument.kind,
          discussion: discussion._id,
          argument,
        });
      });
  }

  upvote = (e) => {
    e.preventDefault();
    this.vote("api/discussions/upvote");
  };

  downvote = (e) => {
    e.preventDefault();
    this.vote("api/discussions/downvote");
  };

  vote = (path) => {
    const payload = {
      id: this.props.discussion._id,
      user: this.props.user,
    };
    axios
      .post(path, payload)
      .then((res) => {
        this.setState({
          score: res.data.upvotes.length - res.data.downvotes.length,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let actions;
    if (this.props.auth.isAuthenticated === false) {
      actions = <div className="card-action"></div>;
    } else {
      actions = (
        <div className="card-action">
          <Link
            className="btn black-text"
            to={{
              pathname: "/attack",
              state: {
                discussion: this.props.discussion._id,
                argument: this.props.discussion.argument,
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
            className="btn btn white black-text"
            style={{ marginLeft: "1rem" }}
            onClick={this.downvote}
          >
            <i className="material-icons">arrow_downward</i>
          </button>
        </div>
      );
    }
    return (
      <div className="col m6 s12">
        <div className="card">
          <div className="card-content">
            <span className="card-title">
              <b>{this.state.score}</b> | <em>{this.state.username}</em>
              <p style={{ fontSize: "60%" }}>{this.state.date} </p>
              <p>
                <i className="tiny material-icons">question_answer</i>{" "}
                {this.state.statComments}
              </p>
            </span>
            <p>{this.state.summary}</p>
          </div>
          {actions}
        </div>
      </div>
    );
  }
}

// export default DiscussionCard;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(DiscussionCard);
