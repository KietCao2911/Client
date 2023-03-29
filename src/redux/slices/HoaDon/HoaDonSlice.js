import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as HoaDonApi from "./HoaDonApi";

const initialState = {
  hoadons: [],
  hoadon: {},
};

export const fetchGetAllOrder = createAsyncThunk(
  "HoaDon/fetchGetAllOrder",
  async () => {
    const res = await HoaDonApi.fetchGetAllHoaDon();
    return res;
  }
);
export const fetchGetOrderDetails = createAsyncThunk(
  "HoaDon/fetchGetOrderDetails",
  async (params) => {
    const { id } = params;
    const res = await HoaDonApi.fetchGetOrderDetails(id);
    return res;
  }
);
export const fetchPutCTHD = createAsyncThunk(
  "HoaDon/fetchPutCTHD",
  async (params) => {
    const { body } = params;
    const res = await HoaDonApi.fetchPutOrderDetails(body);
    return res;
  }
);
export const fetchCancelOrder = createAsyncThunk(
  "HoaDon/fetchCancelOrder",
  async (params) => {
    const { id } = params;
    const res = await HoaDonApi.fetchCancelOrder(id);
    return res;
  }
);
const HoaDonSlice = createSlice({
  initialState,
  name: "HoaDon",
  extraReducers: (builder) => {
    //fetchCancelOrder
    builder.addCase(fetchCancelOrder.fulfilled, (state, action) => {
      const id = action.payload;
      const hoadons = current(state.hoadons);
      console.log({ hoadons });
      let obj = hoadons.find((x) => x.id == id);
      const index = hoadons.indexOf(obj);
      console.log({ obj, index, id });
      if (index > -1) {
        state.hoadons[index].deliveryStatus = -1;
        notification.open({
          message: "Thành công",
          type: "success",
        });
      }
    });
    builder.addCase(fetchPutCTHD.fulfilled, (state, action) => {
      const { hd } = action.payload;
      const { thanhtien } = hd;

      state.hoadon.thanhtien = thanhtien;
      notification.open({
        message: "Thành công",
        type: "success",
      });
    });
    builder.addCase(fetchGetAllOrder.fulfilled, (state, action) => {
      state.hoadons = action.payload;
    });
    builder.addCase(fetchGetOrderDetails.pending, (state, action) => {
      state.hoadon = {};
    });
    builder.addCase(fetchGetOrderDetails.fulfilled, (state, action) => {
      state.hoadon = action.payload;
    });
  },
});

// export const {} = HoaDonSlice.actions

export default HoaDonSlice;
