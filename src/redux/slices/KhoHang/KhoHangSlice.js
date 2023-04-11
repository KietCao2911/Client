import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as KhoHangAPI from "./KhoHangAPI";

export const fetchGetKhoHang = createAsyncThunk(
  "KhoHang/fetchGetKhoHang",
  async (params) => {
    const { maSP } = params;
    const res = await KhoHangAPI.fetchGetKhoHang(maSP);
    return res;
  }
);
export const fetchGetProducts = createAsyncThunk(
  "KhoHang/fetchGetProducts",
  async (params) => {
    const { maChiNhanh, query } = params;
    const res = await KhoHangAPI.fetchGetProducts(maChiNhanh, query);
    return res;
  }
);
const KhoHangSlice = createSlice({
  initialState: {
    khohangs: [],
    sanPhamTrongKho: [],
  },
  name: "KhoHang",
  extraReducers: (builder) => {
    builder.addCase(fetchGetKhoHang.fulfilled, (state, action) => {
      state.khohangs = action.payload;
    });
    builder.addCase(fetchGetProducts.fulfilled, (state, action) => {
      state.sanPhamTrongKho = action.payload;
    });
  },
});
export default KhoHangSlice;
