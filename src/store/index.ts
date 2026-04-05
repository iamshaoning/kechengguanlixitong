import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './slices/studentsSlice';
import coursesReducer from './slices/coursesSlice';
import organizationsReducer from './slices/organizationsSlice';
import userReducer from './slices/userSlice';
import pageReducer from './slices/pageSlice';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    courses: coursesReducer,
    organizations: organizationsReducer,
    user: userReducer,
    page: pageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
