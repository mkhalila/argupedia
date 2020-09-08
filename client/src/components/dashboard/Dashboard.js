import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import Discussions from "../Discussions";
import jumbo from "../layout/jumbo.jpg";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

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
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
              </h4>
              <button
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable white black-text"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div className="container right-align" style={{ marginTop: "2rem" }}>
          <Link
            to="/discussion/new"
            className="btn btn-large waves-effect blue accent-3"
          >
            New Discussion
          </Link>
        </div>
        <Discussions cardActions={true} user={user.id} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
