import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as PhieuNhapAPI from "./PhieuNhapAPI";
import * as CTSLAPI from "../ChiTietSoLuong/CtslAPI";
import { useNavigate } from "react-router-dom";
import { DollarSign, Truck } from "react-feather";
const initialState = {
  item: {},
  items: [],
  chiTietPhieuNhaps: [],
  PhieuNhapInfo: {},
  searchItems: [],
  reload: false,
  loading: false,
};
export const fetchPutThanhToan = createAsyncThunk(
  "fetchPutThanhToan",
  async (params) => {
    const { body } = params;
    const res = await PhieuNhapAPI.fetchPutThanhToan(body);
    return res;
  }
);
export const fetchPutNhapKho = createAsyncThunk(
  "fetchPutNhapKho",
  async (params) => {
    const { body } = params;
    const res = await PhieuNhapAPI.fetchPutNhapKho(body);
    return res;
  }
);
export const fetchGetPhieuNhaps = createAsyncThunk(
  "fetchGetPhieuNhaps",
  async () => {
    const res = await PhieuNhapAPI.fetchGetAllPhieuNhap();
    return res;
  }
);
export const fetchGetPhieuNhapID = createAsyncThunk(
  "fetchGetPhieuNhapID",
  async (params) => {
    const { id } = params;
    const res = await PhieuNhapAPI.fetchGetPhieuNhapID(id);
    return res;
  }
);
export const fetchPostPhieuNhaps = createAsyncThunk(
  "fetchPostPhieuNhaps",
  async (params) => {
    const { body } = params;
    const res = await PhieuNhapAPI.fetchPostPhieuNhap(body);
    return res;
  }
);
export const fetchPutPhieuNhaps = createAsyncThunk(
  "fetchPutPhieuNhaps",
  async (params) => {
    const { body } = params;
    const res = await PhieuNhapAPI.fetchPutPhieuNhap(body);
    return res;
  }
);
export const fetchGetCTPN = createAsyncThunk("fetchGetCTPN", async (params) => {
  const { maPN } = params;
  const res = await PhieuNhapAPI.fetchGetAllCTPN(maPN);
  return res;
});
export const fetchPostCTPN = createAsyncThunk(
  "fetchPostCTPN",
  async (params) => {
    const { body } = params;
    const res = await PhieuNhapAPI.fetchPostCTPN(body);
    return res;
  }
);
export const fetchSearch = createAsyncThunk("fetchSearch", async (params) => {
  const { s } = params;
  const res = await PhieuNhapAPI.FetchSearch(s);
  return res;
});
export const fetchPutCTSL = createAsyncThunk("fetchPutCTSL", async (params) => {
  const { id, body } = params;
  const res = await CTSLAPI.fetchPutCTSL(id, body);
  return res;
});
export const fetchPUTTraHang = createAsyncThunk(
  "fetchPUTTraHang",
  async (body) => {
    const res = await PhieuNhapAPI.fetchPutTraHang(body);
    return res;
  }
);
export const fetchPUTHoanTien = createAsyncThunk(
  "fetchPUTHoanTien",
  async (body) => {
    const res = await PhieuNhapAPI.fetchPutTraHang(body);
    return res;
  }
);
const PhieuNhapSlice = createSlice({
  initialState,
  name: "PhieuNhap",
  extraReducers: (builder) => {
    //FetchPUTHoanTien
    //fetchTraHang
    builder.addCase(fetchPUTHoanTien.pending, (state, action) => {
      state.item = {};
      state.loading = true;
    });
    builder.addCase(fetchPUTHoanTien.fulfilled, (state, action) => {
      state.item = action.payload;
      notification.open({
        message: "Đã hoàn tiền",
        type: "success",
        icon: <Truck />,
      });
      state.loading = false;
    });
    builder.addCase(fetchPUTHoanTien.rejected, (state, action) => {
      notification.open({
        message: "Hoàn tiền thành công",
        type: "success",
      });

      state.loading = false;
    });
    //fetchTraHang
    builder.addCase(fetchPUTTraHang.pending, (state, action) => {
      state.item = {};
      state.loading = true;
    });
    builder.addCase(fetchPUTTraHang.fulfilled, (state, action) => {
      state.item = action.payload;
      notification.open({
        message: "Đã trả hàng",
        type: "success",
        icon: <Truck />,
      });
      state.loading = false;
    });
    builder.addCase(fetchPUTTraHang.rejected, (state, action) => {
      notification.open({
        message: "Trả hàng thất bại",
        type: "success",
      });
    });
    //fetchPuThanhToan
    builder.addCase(fetchPutThanhToan.pending, (state, action) => {
      state.item = {};
      state.loading = true;
    });
    builder.addCase(fetchPutThanhToan.fulfilled, (state, action) => {
      state.item = action.payload;
      notification.open({
        message: "Đã thanh toán cho đơn hàng này",
        type: "success",
        icon: <DollarSign />,
      });
      state.loading = false;
    });
    //fetchPutNhapKho
    builder.addCase(fetchPutNhapKho.pending, (state, action) => {
      state.item = {};
      state.loading = true;
    });
    builder.addCase(fetchPutNhapKho.fulfilled, (state, action) => {
      state.item = action.payload;
      notification.open({
        message: "Đã nhập hàng vào kho",
        type: "success",
        icon: <Truck />,
      });
      state.loading = false;
    });
    //fetchGetPhieuNhapID
    builder.addCase(fetchGetPhieuNhapID.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetPhieuNhapID.fulfilled, (state, action) => {
      state.item = { ...action.payload };
      state.loading = false;
    });
    builder.addCase(fetchGetPhieuNhapID.rejected, () => {
      window.location.replace("/admin/trang-quan-tri-nhap-hang/");
    });
    //fetchPutCTSL
    builder.addCase(fetchPutCTSL.fulfilled, (state, action) => {
      // const result = action.payload;
      state.reload = !state.reload;
    });
    //fetchSearch
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.searchItems = action.payload;
    });
    //fetchPutPhieuNhaps
    builder.addCase(fetchPutPhieuNhaps.fulfilled, (state, action) => {
      state.PhieuNhapInfo = action.payload;
      notification.open({
        message: "Cập nhật thành công",
      });
    });
    builder.addCase(fetchGetPhieuNhaps.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(fetchPostPhieuNhaps.fulfilled, (state, action) => {
      notification.open({
        message: "Tạo thành công",
        type: "success",
      });
      window.location.replace("" + action.payload.id);
    });
    builder.addCase(fetchPostPhieuNhaps.rejected, (state, action) => {
      notification.open({
        message: action.error.message,
        type: "error",
      });
      window.location.replace("" + action.payload.id);
    });
  },
});
export default PhieuNhapSlice;
