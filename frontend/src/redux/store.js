import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { userReducer } from "./reducers/userReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { postReducer } from "./reducers/postReducer";

const store = configureStore(
  { reducer: { user: userReducer, posts: postReducer } },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
