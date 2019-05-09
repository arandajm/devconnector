import { ADD_POST } from "../actions/types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

//Every reducer must export a function with a state and action like parameters!
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    default:
      return state;
  }
}
