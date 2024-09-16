import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/userReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const store = configureStore(
  { reducer: { user: userReducer } },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
