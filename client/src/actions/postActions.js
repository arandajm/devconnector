import axios from "axios";
import {
  GET_ERRORS,
  ADD_POST,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS
} from "./types";

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
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

// Get Posts
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

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  // Ajax call
  axios
    .get(`/api/posts/${id}`)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: GET_POST,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_POST,
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

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  // Ajax call
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(response => {
      console.log("add comment successfully...");
      dispatch({
        type: GET_POST,
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

// delete comment
export const deleteComment = (postId, commentId) => dispatch => {
  // Ajax call
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(response => {
      console.log("delete comment successfully...");
      dispatch({
        type: GET_POST,
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

// Set post loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
