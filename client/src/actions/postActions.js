import axios from "axios";
import { GET_ERRORS, ADD_POST, GET_POSTS, POST_LOADING } from "./types";

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

// Get Profiles
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  // Ajax call
  axios
    .get("/api/posts")
    .then(response => {
      console.log(response.data);
      dispatch({
        type: GET_POSTS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POSTS,
        payload: null
      });
    });
};

// Set profile user
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
