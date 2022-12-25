import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { authSlice } from "./auth/authReducer";

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
///////////////////////////////////////////////
// import { configureStore, combineReducers } from "@reduxjs/toolkit";

// import { authSlice } from "./auth/authReducer";

// import thunk from "redux-thunk";

// const rootReducer = combineReducers({
//   [authSlice.name]: authSlice.reducer,
// });

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: [thunk],
// });
