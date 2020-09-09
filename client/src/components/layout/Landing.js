import React, { Component } from "react";
import { Link } from "react-router-dom";
import jumbo from "./jumbo.jpg";
import Discussions from "../Discussions";

class Landing extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            height: "45vh",
            backgroundImage: "url(" + jumbo + ")",
            backgroundSize: "inherit",
          }}
          className="container valign-wrapper"
        >
          <div className="row">
            <div className="col s12 center-align">
              <p className="flow-text white-text text-darken-1">
                Providing a structured, rational, and formal means to engage in
                argument and discussion.
              </p>
              <br />
              <div className="col s6">
                <Link
                  to="/register"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Register
                </Link>
              </div>
              <div className="col s6">
                <Link
                  to="/login"
                  className="btn btn-large waves-effect white black-text"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Discussions />
      </div>
    );
  }
}

export default Landing;
