import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GetAllColors } from "./MauSacAPI";
const initialState = {
  colors: [],
  loading: false,
  sizeChecked: null,
};

export const fetchALLColors = createAsyncThunk("MauSac/fetchALLColors", async () => {
  const res = await GetAllColors();
  return res;
});

const MauSacSlice = createSlice({
  name: "MauSac",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(fetchALLColors.fulfilled, (state, action) => {
      state.colors = action.payload;
    });
  },
});
export const { } = MauSacSlice.actions;
export default MauSacSlice;
