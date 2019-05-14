import axios from "axios";
import {
  GET_ERRORS,
  ADD_POST,
  GET_POSTS,
  POST_LOADING,
  DELETE_POST
} from "./types";

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

// delete Post
export const deletePost = id => dispatch => {
  // Ajax call
  axios
    .delete(`/api/posts/${id}`)
    .then(response => {
      console.log("delete post successfully...");
      dispatch({
        type: DELETE_POST,
        payload: id
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add Like
export const addLike = id => dispatch => {
  // Ajax call
  axios
    .post(`/api/posts/like/${id}`)
    .then(response => {
      dispatch(getPosts());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Remove Like
export const removeLike = id => dispatch => {
  // Ajax call
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(response => {
      dispatch(getPosts());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set post loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
