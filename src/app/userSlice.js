import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";

export const getMe = createAsyncThunk(
  "user/getMe",
  async (params, thunkApi) => {
    // thunkApi.dispatch
    const currentUser = userApi.getMe();
    return currentUser;
  }
);

const userSlice = createSlice({
  name: "photos",
  initialState: {
    current: {},
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: {
    [getMe.pending]: (state, action) => {
      state.loading = true;
    },
    [getMe.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [getMe.fulfilled]: (state, action) => {
      state.loading = false;
      state.current = action.payload;
    },
  },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
