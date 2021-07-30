import { combineReducers as rootReducer } from "redux";
// import { reducer as listingsReducer } from "../reducers/listingsReducer";
// import { reducer as userReducer } from "../reducers/userReducer";
import { signinReducer } from "../reducers/userReducer";
import productReducer from "./productReducer";
export default rootReducer({
  signinReducer, productReducer
});
