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

const handleUserProduct = (builder) => {
  //fetchGetAllProductsUser
  builder.addCase(fetchGetAllProductsUser.pending, (state) => {
    state.loading.tableLoading = true;
  });
  builder.addCase(fetchGetAllProductsUser.fulfilled, (state, action) => {
    state.loading.tableLoading = false;
    const { products, totalRow } = action.payload;
    state.products = products;
    state.totalRow = totalRow;
  });
  //fetchGetProductUser
  builder.addCase(fetchGetProductUser.pending, (state) => {
    state.loading.tableLoading = true;
  });
  builder.addCase(fetchGetProductUser.rejected, (state) => {
    window.location.replace("/");
  });
  builder.addCase(fetchGetProductUser.fulfilled, (state, action) => {
    state.product = action.payload;
    let hinhAnhs =
      (state.product?.hinhAnhs && state.product?.hinhAnhs[0]) || [];
    let KichThuoc =
      state.product?.sanPhams &&
      state.product?.sanPhams.filter(
        (x) => x?.idColor?.trim() == hinhAnhs[0]?.idMaMau?.trim()
      );
    let Prices = state.product?.sanPhams.sort(
      (a, b) => a.giaBanLe - b.giaBanLe
    );
    let giaBanDisplay = 0;
    let recentlyView =
      JSON.parse(window.localStorage.getItem("recentlyView")) || [];

    if (Prices[0].giaBanLe != Prices[Prices.length - 1].giaBanLe) {
      giaBanDisplay = `${convertVND(Prices[0].giaBanLe)} - ${convertVND(
        Prices[Prices.length - 1].giaBanLe
      )}`;
    } else {
      giaBanDisplay = convertVND(Prices[0].giaBanLe);
    }
    state.product.imgsDisplay = hinhAnhs;
    state.product.sizesDisplay = KichThuoc;
    state.product.giaBanDisplay = giaBanDisplay;
    state.product.colorSelected = hinhAnhs[0]?.idMaMau?.trim();
    if (recentlyView && recentlyView.length > 0) {
      var obj = recentlyView.find(
        (x) => x.maSanPham == state.product.maSanPham
      );
      if (!obj) {
        recentlyView.push(state.product);
        var recentlyViewString = JSON.stringify(recentlyView);
        window.localStorage.setItem("recentlyView", recentlyViewString);
      }
    } else {
      recentlyView.push(state.product);
      var recentlyViewString = JSON.stringify(recentlyView);
      window.localStorage.setItem("recentlyView", recentlyViewString);
    }
    state.loading.btnLoading = false;
  });
};
export default handleUserProduct;
