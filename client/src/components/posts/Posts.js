import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { addPost } from "../../actions/postActions";
import PostForm from "./PostForm";

class Posts extends Component {
  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addPost }
)(Posts);
