import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

// Get Current Profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileUser());
  // Ajax call
  axios
    .get("/api/profile")
    .then(response => {
      console.log(response.data);
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  // Ajax call
  axios
    .post("/api/profile", profileData)
    .then(response => {
      console.log("Create profile successfully...");
      // if it is successful, go to dashboard
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add Experience
export const addExperience = (expData, history) => dispatch => {
  // Ajax call
  axios
    .post("/api/profile/experience", expData)
    .then(response => {
      console.log("add experience successfully...");
      // if it is successful, go to dashboard
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add Education
export const addEducation = (eduData, history) => dispatch => {
  // Ajax call
  axios
    .post("/api/profile/education", eduData)
    .then(response => {
      console.log("add education successfully...");
      // if it is successful, go to dashboard
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone!!")) {
    // Ajax call
    axios
      .delete("/api/profile")
      .then(response => {
        console.log("Delete account successfully...");
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

// Set profile user
export const setProfileUser = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
