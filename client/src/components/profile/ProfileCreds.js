import React, { Component } from "react";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map((exp, index) => (
      <li key={index} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY-MM-DD">{exp.from}</Moment> -{" "}
          {isEmpty(exp.to) ? (
            " Current"
          ) : (
            <Moment format="YYYY-MM-DD">{exp.to}</Moment>
          )}
        </p>
        {isEmpty(exp.title) ? null : (
          <p>
            <strong>Position: </strong> {exp.title}
          </p>
        )}
        {isEmpty(exp.description) ? null : (
          <p>
            <strong>Description: </strong> {exp.description}
          </p>
        )}
      </li>
    ));

    const eduItems = education.map((edu, index) => (
      <li key={index} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY-MM-DD">{edu.from}</Moment> -{" "}
          {isEmpty(edu.to) ? (
            " Current"
          ) : (
            <Moment format="YYYY-MM-DD">{edu.to}</Moment>
          )}
        </p>
        {isEmpty(edu.degree) ? null : (
          <p>
            <strong>Degree: </strong> {edu.degree}
          </p>
        )}
        {isEmpty(edu.description) ? null : (
          <p>
            <strong>Description: </strong> {edu.description}
          </p>
        )}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          <ul className="list-group">{expItems}</ul>
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          <ul className="list-group">{eduItems}</ul>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
