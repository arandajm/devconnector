import { combineReducers } from "redux";
import authReducer from "./authReducer";

//We have to put all ours reducers here!
export default combineReducers({
  auth: authReducer
});
