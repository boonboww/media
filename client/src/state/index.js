import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setFriend: (state, action) => {
      if (state.user.friends) {
        state.user.friends = state.user.friends.filter(
          (friend) => friend._id !== action.payload.friendId
        );
      } else {
        console.error("User friends array is undefined. Cannot remove friend.");
      }
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.postId) {
          return action.payload.likes;
        }
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setPosts, setFriend, setPost } =
  authSlice.actions;
export default authSlice.reducer;
