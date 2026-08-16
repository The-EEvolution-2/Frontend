import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice';
import resourceReducer from './resourceSlice';
import projectReducer from './projectSlice';
import communityReducer from './communitySlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    resources: resourceReducer,
    projects: projectReducer,
    community: communityReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
