import axios from "axios";
import { GET_ERRORS, ADD_POST } from "./types";

// Add Post
export const addPost = postData => dispatch => {
  // Ajax call
  axios
    .post("/api/posts", postData)
    .then(response => {
      console.log("add post successfully...");
      dispatch({
        type: ADD_POST,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
