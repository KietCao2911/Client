import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "./MauSacAPI";
import { message } from "antd";
const initialState = {
  colors: [],
  loading: false,
  sizeChecked: null,
};

export const fetchALLColors = createAsyncThunk("MauSac/fetchALLColors", async () => {
  const res = await API.GetAllColors();
  return res;
});
export const PostColor = createAsyncThunk("MauSac/PostColor", async (body) => {
  const res = await API.PostColor(body);
  return res;
});
export const DeleteColor = createAsyncThunk("MauSac/DeleteColor", async (id) => {
  const res = await API.DeleteColor(id);
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
    //
    builder.addCase(PostColor.fulfilled, (state, action) => {
      // state.colors = action.payload;
      message.open({
        content:"Thêm thành công",
        type:"success"
      })
    });
    //
    builder.addCase(DeleteColor.fulfilled, (state, action) => {
      // state.colors = action.payload;
    });
    //
  },
});
export const { } = MauSacSlice.actions;
export default MauSacSlice;
