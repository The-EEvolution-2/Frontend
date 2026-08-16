import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Resource, ResourceState } from '../types/resource';
import { INITIAL_RESOURCES } from '../constants/mockResources';

const initialState: ResourceState = {
  items: INITIAL_RESOURCES,
  selectedCategory: 'All',
  loading: false,
  error: null,
};

export const resourceSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setResources: (state, action: PayloadAction<Resource[]>) => {
      state.items = action.payload;
    },
    addResource: (state, action: PayloadAction<Resource>) => {
      state.items.unshift(action.payload);
    },
  },
});

export const { setCategory, setResources, addResource } = resourceSlice.actions;
export default resourceSlice.reducer;
