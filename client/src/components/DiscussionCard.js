import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class DiscussionCard extends Component {
  constructor() {
    super();
    this.state = {
      score: "",
      username: "",
      date: "",
      summary: "",
      statComments: 0,
    };
  }

  componentDidMount() {
    const {
      upvotes,
      downvotes,
      date,
      user,
      argument,
      counterArguments,
    } = this.props.discussion;
    axios
      .get("/api/users/id", {
        params: { id: user },
      })
      .then((res) => {
        axios
          .get("/api/arguments/id", {
            params: { id: argument },
          })
          .then((res1) => {
            this.setState({
              score: upvotes.length - downvotes.length,
              date: this.formatDate(date),
              username: res.data.user.name,
              summary: this.summary(res1.data.argument),
              statComments: counterArguments.length + 1,
            });
          });
      });
  }

  formatDate(date) {
    let fd = new Date(date);
    fd = `${fd.toLocaleString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}, ${fd.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`;
    return fd;
  }

  summary(argument) {
    if (argument.kind === "ActionArgument") {
      return (
        `In the current circumstances "${argument.R}"; ` +
        `We should perform action "${argument.A}"; ` +
        `Which will result in new circumstances "${argument.S}"; ` +
        `Which will realise goal "${argument.G}"; ` +
        `Which will promote value "${argument.V}".`
      );
    }
    if (argument.kind === "ExpertOpinionArgument") {
      return (
        `"${argument.E}" is an expert in subject domain "${argument.D}" ` +
        `containing proposition "${argument.A}". ` +
        `"${argument.E}" asserts that "${argument.A}" is true. ` +
        `Therefore "${argument.A}" is true.`
      );
    }
    return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac dolor sit amet sem sagittis convallis non ac sem. Mauris id sagittis enim. Mauris sed lorem quis ipsum volutpat convallis.";
  }

  upvote = (e) => {
    e.preventDefault();
    const payload = {
      id: this.props.discussion._id,
      user: this.props.user,
    };
    console.log(payload);
    axios
      .post("api/discussions/upvote", payload)
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
      id: this.props.discussion._id,
      user: this.props.user,
    };
    axios
      .post("api/discussions/downvote", payload)
      .then((res) => {
        this.setState({
          score: res.data.upvotes.length - res.data.downvotes.length,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    let actions;
    if (this.props.cardActions === false) {
      actions = (
        <div class="card-action">
          <i className="material-icons">question_answer</i>{" "}
          {this.state.statComments}
        </div>
      );
    } else {
      actions = (
        <div class="card-action">
          <i className="material-icons">question_answer</i>{" "}
          {this.state.statComments}
          <Link
            className="btn"
            style={{ marginLeft: "1rem" }}
            to={{
              pathname: "/attack",
              state: this.props.discussion.argument,
            }}
          >
            Attack
          </Link>
          <button
            className="btn"
            style={{ marginLeft: "1rem" }}
            onClick={this.upvote}
          >
            +1
          </button>
          <button
            className="btn"
            style={{ marginLeft: "1rem" }}
            onClick={this.downvote}
          >
            -1
          </button>
        </div>
      );
    }
    return (
      <div className="col m6 s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title">
              <b>{this.state.score}</b> | <em>{this.state.username}</em>
              <p style={{ fontSize: "60%" }}>{this.state.date}</p>
            </span>
            <p>{this.state.summary}</p>
          </div>
          {actions}
        </div>
      </div>
    );
  }
}

export default DiscussionCard;
