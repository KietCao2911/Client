import * as API from "./SanPhamAPI";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { message, notification } from "antd";
import convertVND from "~/components/utils/ConvertVND";
///USER
export const fetchGetProductUser = createAsyncThunk(
  "fetchGetProductUser",
  async (params) => {
    const { slug } = params;
    const res = await API.GetProduct(slug);
    return res;
  }
);
export const fetchGetAllProductsUser = createAsyncThunk(
  "fetchGetAllProductsUser",
  async (props) => {
    const { params } = props;
    const res = await API.GetAllProducts(params);
    return res;
  }
);
export const fetchQTY = createAsyncThunk("fetchQTY", async (params) => {
  const { maSanPham } = params;
  const res = await API.GetQTY(maSanPham);
  return res;
});
