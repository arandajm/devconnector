const initialState = {
  posts: [],
  post: {},
  loading: false
};

//Every reducer must export a function with a state and action like parameters!
export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
