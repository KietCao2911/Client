import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as HoaDonApi from "./HoaDonApi";

const initialState = {
  hoadons: [],
  hoadon: {},
  loading: false,
};

export const fetchGetAllOrder = createAsyncThunk(
  "HoaDon/fetchGetAllOrder",
  async (params) => {
    const res = await HoaDonApi.fetchGetAllHoaDon(params);
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
export const fetchPutDaGiaoHang = createAsyncThunk(
  "HoaDon/fetchPutDaGiaoHang",
  async (params) => {
    const { body } = params;
    const res = await HoaDonApi.fetchPutDaGiaoHang(body);
    return res;
  }
);
export const fetchCancelOrder = createAsyncThunk(
  "HoaDon/fetchCancelOrder",
  async (params) => {
    const { body } = params;
    const res = await HoaDonApi.fetchCancelOrder(body);
    return res;
  }
);
export const fetchPutXuatKho = createAsyncThunk(
  "HoaDon/fetchPutXuatKho",
  async (params) => {
    const { body } = params;
    const res = await HoaDonApi.fetchPutXuatKho(body);
    return res;
  }
);
export const fetchThanhToan = createAsyncThunk(
  "HoaDon/fetchThanhToan",
  async (params) => {
    const { body } = params;
    const res = await HoaDonApi.fetchThanhToan(body);
    return res;
  }
);
export const fetchPUTHoanTien = createAsyncThunk(
  "fetchPUTHoanTien",
  async (params) => {
    const { body } = params;
    const res = await HoaDonApi.fetchPUTHoanTien(body);
    return res;
  }
);
export const fetchPUTHoaDon = createAsyncThunk(
  "fetchPUTHoaDon",
  async (params) => {
    const { body } = params;
    const res = await HoaDonApi.fetchPutHoaDon(body);
    return res;
  }
);
export const fetchPutTraHang = createAsyncThunk(
  "fetchPutTraHang",
  async (params) => {
    const { body } = params;
    const res = await HoaDonApi.fetchPutTraHang(body);
    return res;
  }
);
const HoaDonSlice = createSlice({
  initialState,
  name: "HoaDon",
  extraReducers: (builder) => {
//fetchPutTraHang
    builder.addCase(fetchPutTraHang.pending, (state, action) => {
      state.hoadon = {};
      state.loading = true;
    });
    builder.addCase(fetchPutTraHang.fulfilled, (state, action) => {
      state.hoadon = action.payload;
      state.loading = false;
      notification.open({
        message:"Đã trả hàng thành công",
        type:"success"
      })
    });
    //fetchPUTHoaDon
    builder.addCase(fetchPUTHoaDon.pending, (state, action) => {
      state.hoadon = {};
      state.loading = true;
    });
    builder.addCase(fetchPUTHoaDon.fulfilled, (state, action) => {
      state.hoadon = action.payload;
      state.loading = false;
      notification.open({
        message:"Cập nhật thành công",
        type:"success"
      })
    });
    builder.addCase(fetchPUTHoaDon.rejected, (state, action) => {
      state.loading = false;
      notification.open({
        message:"Cập nhật thất bại",
        type:"error"
      })
    });
    //fetchPUTHoanTien
    builder.addCase(fetchPUTHoanTien.pending, (state, action) => {
      state.hoadon = {};
      state.loading = true;
    });
    builder.addCase(fetchPUTHoanTien.fulfilled, (state, action) => {
      state.hoadon = action.payload;
      state.loading = false;
    });
    //fetchPutXuatKho
    builder.addCase(fetchPutXuatKho.pending, (state, action) => {
      state.hoadon = {};
      state.loading = true;
    });
    builder.addCase(fetchPutXuatKho.fulfilled, (state, action) => {
      state.hoadon = action.payload;
      state.loading = false;
    });
    //fetchCancelOrder
    builder.addCase(fetchCancelOrder.fulfilled, (state, action) => {
      state.hoadon = action.payload;
      state.loading = false;
      notification.open({
        message: "Trả hàng thành công",
        type: "success",
      });
    });
    builder.addCase(fetchPutDaGiaoHang.fulfilled, (state, action) => {
      const { hd } = action.payload;
      const { thanhtien } = hd;
      state.hoadon.thanhtien = thanhtien;
      notification.open({
        message: "Thành công",
        type: "success",
      });
    });
    //Thanh Toán
    builder.addCase(fetchThanhToan.fulfilled, (state, action) => {
      state.hoadon = action.payload;
      notification.open({
        message: "Thanh toán thành công",
        type: "success",
      });
    });
    //Lấy tất cả
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
