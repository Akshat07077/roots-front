import { configureStore } from "@reduxjs/toolkit";
import documentReducer from "./slices/documentSlice";

const store = configureStore({
  reducer: {
    document: documentReducer,
  },
});

export default store;
