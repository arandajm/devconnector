import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Add authorization token like a default header to any request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // if it exists, delete it!
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
