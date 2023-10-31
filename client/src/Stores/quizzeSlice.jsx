import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCreateQuizOpen: false,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    openCreateQuiz: (state) => {
      state.isCreateQuizOpen = true;
    },
    closeCreateQuiz: (state) => {
      state.isCreateQuizOpen = false;
    },
  },
});

export const { openCreateQuiz, closeCreateQuiz } = quizSlice.actions;

export default quizSlice.reducer;
