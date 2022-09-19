import { combineReducers } from "redux";
import navbarReducer from "./navbarReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
  navbar: navbarReducer,
  cart: cartReducer,
});

export default rootReducer;
