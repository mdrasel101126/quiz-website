import { quizApi } from "@/redux/api/apiSlice";

const examQuizzApi = quizApi.injectEndpoints({
  endpoints: (builder) => ({
    createQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes/create-quiz",
        method: "POST",
        body: data,
      }),
    }),
    updateQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["updateQuiz"],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/Quizs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteQuiz"],
    }),

    getAllQuiz: builder.query({
      query: () => `/Quizs`,
      providesTags: ["deleteQuiz", "updateQuiz"],
    }),
    getExamQuestion: builder.query({
      query: (id) => `/quizzes/exam-quizzes/${id}`,
      providesTags: ["deleteQuiz", "updateQuiz"],
    }),
  }),
});

export const { useGetExamQuestionQuery } = examQuizzApi;
