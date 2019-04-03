const initialState = {
  isAuthenticated: false,
  user: {}
};

//Each reducer must export a function!
export default function(state = initialState, action) {
  switch (action) {
    default:
      return state;
  }
}
