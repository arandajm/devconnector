import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
import { connect } from "react-redux";
import { authActions } from "../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    // Create register state
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    // Bind this with onChange
    this.onChange = this.onChange.bind(this);
    // Bind this with onSubmit
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    // Set new state values when onChange event is happened
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // any actions brings in a prop!
    this.props.authActions(newUser);

    /*  axios
      .post("/api/users/register", newUser)
      .then(response => console.log(response.data))
      .catch(err => {
        console.log(err.response.data);
        this.setState({ errors: err.response.data });
      }); */
  }

  render() {
    // Is the same that const errors = this.state.errors
    const { errors } = this.state;
    // Get user from auth prop!
    const { user } = this.props.auth;

    return (
      <div className="register">
        {user ? user.name : null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    // Link state with the field
                    value={this.state.name}
                    // Bind field with onChange event
                    onChange={this.onChange}
                  />
                  {errors.name && (
                    // If errors.name has a value, show the error message
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    // Link state with the field
                    value={this.state.email}
                    // Bind field with onChange event
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    // If errors.email has a value, show the error message
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    // Link state with the field
                    value={this.state.password}
                    // Bind field with onChange event
                    onChange={this.onChange}
                  />
                  {errors.password && (
                    // If errors.password has a value, show the error message
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    // Link state with the field
                    value={this.state.password2}
                    // Bind field with onChange event
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    // If errors.password has a value, show the error message
                    <div className="invalid-feedback">{errors.password2}</div>
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

// Second parameter we map de actions
// We use connect to use redux our components
export default connect(
  mapStateToProps,
  { authActions }
)(Register);
