import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import classnames from "classnames";
import ActionArgumentForm from "./ActionArgumentForm";
import axios from "axios";
import ExpertOpinionArgumentForm from "./ExpertOpinionArgumentForm";

class DiscussionForm extends Component {
  constructor() {
    super();
    this.state = {
      argumentValues: {},
      scheme: "Argument",
      errors: {},
    };
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
      scheme: this.state.scheme,
      argumentValues: this.state.argumentValues,
    };
    console.log(this.state.argumentValues);
    axios
      .post("/api/discussions", payload)
      .then((res) => {
        console.log(res);
        this.props.history.push("/dashboard");
      })
      .catch((error) => console.log(error));
  };

  onSelect = (e) => {
    this.setState({
      scheme: e.target.value,
    });
    console.log(this.state);
  };

  render() {
    const { errors } = this.state;
    let form = <ActionArgumentForm updateArgument={this.updateArgument} />;
    if (this.state.scheme === "ExpertOpinionArgument") {
      form = <ExpertOpinionArgumentForm updateArgument={this.updateArgument} />;
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
                <b>Create</b> Discussion
              </h4>
              <p className="grey-text text-darken-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac
                dolor sit amet sem sagittis convallis non ac sem. Mauris id
                sagittis enim. Mauris sed lorem quis ipsum volutpat convallis.
                Mauris lobortis elit vitae pulvinar elementum. Nullam ante nunc,
                porttitor nec mauris quis, gravida blandit eros. Sed auctor
                sapien at tempor sagittis. Duis eu malesuada eros, vel ultricies
                orci. Pellentesque convallis facilisis ante id eleifend.
              </p>
              <div className="input-field col s12">
                <select style={{ display: "flex" }} onChange={this.onSelect}>
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
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem",
                }}
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

DiscussionForm.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(DiscussionForm);
