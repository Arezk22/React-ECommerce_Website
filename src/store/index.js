import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/CartSlice";
import { counter } from "@fortawesome/fontawesome-svg-core";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
