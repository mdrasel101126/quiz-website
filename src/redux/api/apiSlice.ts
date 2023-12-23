import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("quizAccessToken");
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["updateUser", "deleteUser"],
  endpoints: () => ({}),
});

/* import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
export const homeTutorApi = createApi({
  reducerPath: "homeTutorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: " http://localhost:5000/api/v1/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user?.accessToken;
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: [
    "reviews",
    "addTutor",
    "deleteTutor",
    "updateTutor",
    "addBooking",
    "deleteBooking",
    "updateUser",
    "deleteUser",
  ],
  endpoints: () => ({}),
}); */
