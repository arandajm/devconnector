import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

//We have to put all ours reducers here!
export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
