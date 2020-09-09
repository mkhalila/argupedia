import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ActionArgumentForm from "./ActionArgumentForm";
import axios from "axios";
import ExpertOpinionArgumentForm from "./ExpertOpinionArgumentForm";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class AttackForm extends Component {
  constructor() {
    super();
    this.state = {
      argumentValues: {},
      scheme: "Argument",
      criticalQuestion: "",
      errors: {},
    };
  }

  componentDidMount() {
    console.log(this.props.location.state);
  }

  updateArgument = (updatedArgument) => {
    this.setState({
      argumentValues: updatedArgument,
      scheme: updatedArgument.scheme,
      errors: this.state.errors,
    });
  };

  onSubmit = (e) => {
    const payload = {
      user: this.props.auth.user.id,
      discussion: this.props.location.state.discussion,
      victim: this.props.location.state.argument,
      criticalQuestion: this.state.criticalQuestion,
      scheme: this.state.scheme,
      argumentValues: this.state.argumentValues,
    };
    console.log(payload);
    axios
      .post("/api/discussions/attack", payload)
      .then((res) => {
        console.log(res.data);
        this.props.history.push("/dashboard");
      })
      .catch((error) => console.log(error));
  };

  onSelectCriticalQuestion = (e) => {
    console.log(e.target.value);
    this.setState({
      criticalQuestion: e.target.value,
    });
  };

  onSelectScheme = (e) => {
    this.setState({
      scheme: e.target.value,
    });
  };

  render() {
    const { errors } = this.state;
    let form = <ActionArgumentForm updateArgument={this.updateArgument} />;
    if (this.state.scheme === "ExpertOpinionArgument") {
      form = <ExpertOpinionArgumentForm updateArgument={this.updateArgument} />;
    }
    let criticalQuestion;
    if (this.props.location.state.scheme === "ActionArgument") {
      criticalQuestion = (
        <select
          style={{ display: "flex" }}
          onChange={this.onSelectCriticalQuestion}
        >
          <option value="" disabled selected>
            Select Critical Question
          </option>
          <option value="Are the believed circumstances true?">
            Are the believed circumstances true?
          </option>
        </select>
      );
    } else if (this.props.location.state.scheme === "ExpertOpinionArgument") {
      criticalQuestion = (
        <select
          style={{ display: "flex" }}
          onChange={this.onSelectCriticalQuestion}
        >
          <option value="" disabled selected>
            Select Critical Question
          </option>
          <option value="How credible is this Expert?">
            How credible is this expert?
          </option>
        </select>
      );
    } else {
      criticalQuestion = (
        <select
          style={{ display: "flex" }}
          onChange={this.onSelectCriticalQuestion}
        >
          <option value="" disabled selected>
            Select Critical Question
          </option>
        </select>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Attack</b> Argument
              </h4>
              <p className="grey-text text-darken-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac
                dolor sit amet sem sagittis convallis non ac sem.
              </p>
              <div className="input-field col s12">{criticalQuestion}</div>
              <div className="input-field col s12">
                <select
                  style={{ display: "flex" }}
                  onChange={this.onSelectScheme}
                >
                  <option value="" disabled selected>
                    Select Argument Scheme
                  </option>
                  <option value="ActionArgument">Action</option>
                  <option value="ExpertOpinionArgument">Expert Opinion</option>
                </select>
              </div>
            </div>
            {form}
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <button
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                onClick={this.onSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(AttackForm);
