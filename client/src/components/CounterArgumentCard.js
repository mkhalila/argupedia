import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

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
          date: this.formatDate(ca.date),
          summary: this.summary(ca.argument),
          argument: ca.argument._id,
          criticalQuestion: ca.criticalQuestion,
          scheme: ca.argument.kind,
        });
      });
    //   .catch((err) => console.log(err));
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
            className="btn"
            to={{
              pathname: "/attack",
              state: {
                discussion: this.props.discussion,
                argument: this.props.counterArgument,
                scheme: this.state.scheme,
              },
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
      </div>
    );
  }
}

// export default DiscussionCard;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(CounterArgumentCard);
