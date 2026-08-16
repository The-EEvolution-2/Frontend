import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Project, ProjectState } from '../types/project';
import { INITIAL_PROJECTS } from '../constants/mockProjects';

const initialState: ProjectState = {
  items: INITIAL_PROJECTS,
  loading: false,
  error: null,
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.items = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { setProjects, addProject } = projectSlice.actions;
export default projectSlice.reducer;
