import { combineReducers as rootReducer } from "redux";
// import { reducer as listingsReducer } from "../reducers/listingsReducer";
// import { reducer as userReducer } from "../reducers/userReducer";
// import { userReducer } from "../reducers/userReducer";
import productReducer from "./productReducer";
export default rootReducer({
  productReducer
});
