import React, { Component } from "react";
import DiscussionCard from "./DiscussionCard";
import axios from "axios";
import { Link } from "react-router-dom";

export class Discussions extends Component {
  constructor() {
    super();
    this.state = {
      discussions: [],
      errors: {},
    };
  }

  componentDidMount() {
    axios.get("/api/discussions").then((res) => {
      this.setState({ discussions: res.data });
      console.log(res.data);
    });
  }

  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "2rem" }} className="row">
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Discussions</b> taking place
            </h4>
            <div class="row">
              {this.state.discussions.map((discussion) => (
                <Link
                  to={{
                    pathname: "/discussion",
                    state: {
                      discussion,
                      cardActions: this.props.cardActions,
                      user: this.props.user,
                    },
                  }}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <DiscussionCard
                    key={discussion._id}
                    discussion={discussion}
                    cardActions={this.props.cardActions}
                    user={this.props.user}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Discussions;
