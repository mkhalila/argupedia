import React, { Component } from "react";
import classnames from "classnames";

export class ExpertOpinionArgumentForm extends Component {
  constructor() {
    super();
    this.state = {
      E: "",
      D: "",
      A: "",
      scheme: "ExpertOpinionArgument",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
    const { E, A, D, scheme } = this.state;
    console.log(this.state);
    this.props.updateArgument.bind(this, { E, A, D, scheme })();
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="col s12 card" style={{ border: "1px solid #f1f1f1" }}>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          <h5>
            <b>Expert Opinion</b> Argument
          </h5>
        </div>
        <div className="input-field col s12">
          <input
            onChange={this.onChange}
            value={this.state.name}
            error={errors.name}
            id="E"
            name="E"
            type="text"
            className={classnames("", {
              invalid: errors.name,
            })}
          />
          <label htmlFor="name">Expert name</label>
          <span className="red-text">{errors.name}</span>
        </div>
        <div className="input-field col s12">
          <input
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
            id="D"
            name="D"
            type="text"
            className={classnames("", {
              invalid: errors.email,
            })}
          />
          <label htmlFor="email">Who is an expert in Domain</label>
          <span className="red-text">{errors.email}</span>
        </div>
        <div className="input-field col s12">
          <input
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="A"
            name="A"
            type="text"
            className={classnames("", {
              invalid: errors.password,
            })}
          />
          <label htmlFor="password">Asserts the following proposition</label>
          <span className="red-text">{errors.password}</span>
        </div>
      </div>
    );
  }
}

export default ExpertOpinionArgumentForm;
