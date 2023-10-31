import { configureStore } from "@reduxjs/toolkit"
import adminSlice from "./adminSlice"
import quizzeSlice from "./quizzeSlice"

export const stores = configureStore({
  reducer: {
    admin: adminSlice,
    quiz: quizzeSlice,
  },
})