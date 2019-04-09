import axios from "axios";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

// Get Current Profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileUser());
  // Ajax call
  axios
    .post("/api/profile")
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
