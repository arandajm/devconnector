import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

//We have to put all ours reducers here!
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer
});
