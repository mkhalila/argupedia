import React, { Component } from "react";
import classnames from "classnames";

export class ActionArgumentForm extends Component {
  constructor() {
    super();
    this.state = {
      R: "",
      A: "",
      S: "",
      G: "",
      V: "",
      scheme: "ActionArgument",
      errors: {},
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name, e.target.value);
    const { R, A, S, G, V, scheme } = this.state;
    console.log(this.state);
    this.props.updateArgument.bind(this, { R, A, S, G, V, scheme })();
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="col s12 card" style={{ border: "1px solid #f1f1f1" }}>
        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
          <h5>
            <b>Action</b> Argument
          </h5>
        </div>
        <div className="input-field col s12">
          <input
            onChange={this.onChange}
            value={this.state.name}
            error={errors.name}
            id="R"
            name="R"
            type="text"
            className={classnames("", {
              invalid: errors.name,
            })}
          />
          <label htmlFor="name">In the current circumstances</label>
          <span className="red-text">{errors.name}</span>
        </div>
        <div className="input-field col s12">
          <input
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
            id="A"
            name="A"
            type="text"
            className={classnames("", {
              invalid: errors.email,
            })}
          />
          <label htmlFor="email">We should perform action</label>
          <span className="red-text">{errors.email}</span>
        </div>
        <div className="input-field col s12">
          <input
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="S"
            name="S"
            type="text"
            className={classnames("", {
              invalid: errors.password,
            })}
          />
          <label htmlFor="password">
            Which will result in new circumstances
          </label>
          <span className="red-text">{errors.password}</span>
        </div>
        <div className="input-field col s12">
          <input
            onChange={this.onChange}
            value={this.state.password2}
            error={errors.password2}
            id="G"
            name="G"
            type="text"
            className={classnames("", {
              invalid: errors.password2,
            })}
          />
          <label htmlFor="password2">Which will realise goal</label>
          <span className="red-text">{errors.password2}</span>
        </div>
        <div className="input-field col s12">
          <input
            onChange={this.onChange}
            value={this.state.password2}
            error={errors.password2}
            id="V"
            name="V"
            type="text"
            className={classnames("", {
              invalid: errors.password2,
            })}
          />
          <label htmlFor="password2">Which will promote value</label>
          <span className="red-text">{errors.password2}</span>
        </div>
      </div>
    );
  }
}

export default ActionArgumentForm;
