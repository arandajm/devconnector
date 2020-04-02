import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import {} from "react-redux";

const Navbar = () => {
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  const dispatch = useDispatch();

  const onLogoutClick = e => {
    e.preventDefault();
    dispatch(clearCurrentProfile());
    dispatch(logoutUser());
  };

  const authLinks = (
    //HMTL or JSX
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/feed">
          Post Feed
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          Dashboard
        </Link>
      </li>
      <li>
        <a
          href="_blank"
          onClick={onLogoutClick.bind(this)}
          className="nav-link"
        >
          <img
            className="rounded-circle"
            src={user.avatar}
            alt={user.name}
            title="You must have a Gravatar connected to your email to display an image"
            style={{ width: "25px", marginRight: "5px" }}
          />
          LogOut
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Sign Up
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          DevConnector
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#mobile-nav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mobile-nav">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                {" "}
                Developers
              </Link>
            </li>
          </ul>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
