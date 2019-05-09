import React, { Component } from "react";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileGitHub from "./ProfileGitHub";
import ProfileCreds from "./ProfileCreds";
import { getProfileByHandle } from "../../actions/profileActions";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      //if exists handle param in the url, call to getProfileByHandle
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentWillReceiveProps(nextProps) {
    // if profile === null and loading is false, redirect to not-found
    if (this.props.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6 mb-2">
              <Link to="/profiles" className="btn btn-light">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>

          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            experience={profile.experience}
            education={profile.education}
          />
          {profile.githubusername ? (
            <ProfileGitHub username={profile.githubusername} />
          ) : null}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{profileContent}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile
});

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
