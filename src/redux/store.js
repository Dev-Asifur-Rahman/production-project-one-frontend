import { configureStore } from "@reduxjs/toolkit";
import deal_modalReducer from "@/redux/features/modalSlice";

const store = configureStore({
  reducer: {
    deal_modal: deal_modalReducer,
  },
});

export default store;
