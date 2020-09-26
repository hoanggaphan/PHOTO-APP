import { createSlice } from "@reduxjs/toolkit";

// Initilaize reducer and actions
const photoSlice = createSlice({
  name: "photos",
  initialState: [],
  reducers: {
    addPhoto(state, action) {
      state.push(action.payload);
    },
  },
});

// export actions
export const { addPhoto } = photoSlice.actions;

// export selectors
export const selectPhotos = state => state.photos;

// export reducer
export default photoSlice.reducer;
