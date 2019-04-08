import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";

class Login extends Component {
  constructor() {
    super();
    //Create login state
    this.state = {
      email: "",
      password: "",
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
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  //Use this hook when receive a new prop!
  componentWillReceiveProps(nextProps) {
    // Check if user is aunthenticate and redirect to dashboard!
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    // Is the same that const errors = this.state.errors
    const { errors } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
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
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
