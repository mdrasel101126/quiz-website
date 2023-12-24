import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { quizApi } from "./api/apiSlice";
const store = configureStore({
  reducer: {
    user: userReducer,

    [quizApi.reducerPath]: quizApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quizApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
