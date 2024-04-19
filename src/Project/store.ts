import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../Users/userReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;