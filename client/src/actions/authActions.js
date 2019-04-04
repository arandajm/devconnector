import axios from "axios";
import { GET_ERRORS } from "./types";

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
