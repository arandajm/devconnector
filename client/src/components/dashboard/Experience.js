import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";

class Experience extends Component {
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to ? <Moment format="YYYY/MM/DD">{exp.to}</Moment> : " Now"}
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ));

    return (
      <div>
        <h1 className="mb-4">Experience credentials</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Company</th>
              <th scope="col">Title</th>
              <th scope="col">Years</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(withRouter(Experience));
