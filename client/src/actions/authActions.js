import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

// Register user
export const registerUser = (userData, history) => dispatch => {
  // Ajax call
  axios
    .post("/api/users/register", userData)
    .then(response => {
      console.log(response.data);
      // if it is successful, go to login
      history.push("/login");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Login user
export const loginUser = userData => dispatch => {
  // Ajax call
  axios
    .post("/api/users/login", userData)
    .then(response => {
      console.log(response.data);
      // Get token from response data
      const { token } = response.data;
      // Set token to localstorage
      localStorage.setItem("jwtToken", token);
      // Set token to Authorization header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  //Remove token from localstorage
  localStorage.removeItem("jwtToken");
  //Remove auth header for futures requests
  setAuthToken(false);
  // Set empty current user and isAuthenticated to false
  dispatch(setCurrentUser({}));
};
