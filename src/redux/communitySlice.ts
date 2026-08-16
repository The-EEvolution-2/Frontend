import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post, CommunityState } from '../types/community';
import { INITIAL_POSTS } from '../constants/mockCommunity';

const initialState: CommunityState = {
  posts: INITIAL_POSTS,
  loading: false,
  error: null,
};

export const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const post = state.posts.find((p) => p.id === action.payload);
      if (post) {
        post.likes += 1;
      }
    },
  },
});

export const { setPosts, addPost, toggleLike } = communitySlice.actions;
export default communitySlice.reducer;
