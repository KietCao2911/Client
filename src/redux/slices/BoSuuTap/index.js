import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import GroupBy from "~/components/utils/GroupBy";
import URLConvert from "~/components/utils/URLConvert";
import * as api from "./BoSuuTapApi";
export const fetchAllBST = createAsyncThunk(
  "BoSuuTap/fetchAllBST",
  async (params) => {
    const { query } = params;
    const res = await api.GetAllBST(query);
    return res;
  }
);
export const fetchByIdBST = createAsyncThunk(
  "BoSuuTap/fetchByIdBST",
  async (params) => {
    const { id } = params;
    const res = await api.GetBSTById(id);
    return res;
  }
);
export const fetchBySlugBST = createAsyncThunk(
  "BoSuuTap/fetchBySlugBST",
  async (params) => {
    const { slug } = params;
    const res = api.GetBSTBySlug(slug);
    return res;
  }
);
export const fetchGetProductByBST = createAsyncThunk(
  "BoSuuTap/fetchGetProductByBST",
  async (props, { rejectWithValue }) => {
    console.log({ rejectWithValue });
    const { id, params } = props;
    const res = await api.GetProductByBST(id, params);
    return res;
  }
);
export const fetchPostBST = createAsyncThunk(
  "BoSuuTap/fetchPostBST",
  async (params) => {
    const { body } = params;
    const res = await api.PostBST(body);
    return res;
  }
);
export const fetchPutBST = createAsyncThunk(
  "BoSuuTap/fetchPutBST",
  async (params) => {
    const { body, id } = params;
    const res = await api.PutBST(id, body);
    return res;
  }
);
export const fetchDeleteBST = createAsyncThunk(
  "BoSuuTap/fetchDeleteBST",
  async (params) => {
    const { id } = params;
    const res = await api.DeleteBST(id);
    return res;
  }
);
export const fetchUploadImgBST = createAsyncThunk(
  "BoSuuTap/fetchUploadImgBST",
  async (params) => {
    const { id, body, config } = params;
    const res = await api.UploadImgBST(id, body, config);
    return res;
  }
);

export const fetchRemoveImgBST = createAsyncThunk(
  "BoSuuTap/fetchRemoveImgBST",
  async (params, { rejectWithValue }) => {
    const { id, fileName } = params;
    try {
      const res = await api.RemoveImgBST(id, fileName);
      return res;
    } catch (err) {
      throw rejectWithValue(err.response.data);
    }
  }
);
export const fetchRemoveProductsFormBST = createAsyncThunk(
  "BoSuuTap/fetchRemoveProductsFormBST",
  async (params, { rejectWithValue }) => {
    const { id, config } = params;
    try {
      const res = await api.RemoveProductsFormBST(id, config);
      return res;
    } catch (err) {
      throw rejectWithValue(err.response.data);
    }
  }
);
const initialState = {
  boSuuTaps: [],
  products: [],
  boSuuTap: {},
  loading: false,
};
const BSTSlice = createSlice({
  initialState,
  name: "BoSuuTap",
  extraReducers: (builder) => {
    //fetchBySlugBST
    builder.addCase(fetchBySlugBST.pending, (state, action) => {
      state.loading = true;
      state.boSuuTap = {};
    });
    builder.addCase(fetchBySlugBST.fulfilled, (state, action) => {
      state.boSuuTap = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllBST.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllBST.fulfilled, (state, action) => {
      state.loading = false;
      state.boSuuTaps = action.payload;
    });
    builder.addCase(fetchAllBST.rejected, (state, action) => {
      state.loading = false;
    });
    //fetchByIdBST
    builder.addCase(fetchByIdBST.pending, (state) => {
      state.loading = true;
      state.boSuuTap = {};
    });
    builder.addCase(fetchByIdBST.fulfilled, (state, action) => {
      state.boSuuTap = action.payload;
      var imgTemp = [
        {
          uid: "1",
          name: action.payload.img,
          status: "done",
          // custom error message to show
          url: `https://localhost:44328/wwwroot/res/BstImgs/${action.payload.img.trim()}`,
          ...state.boSuuTap.img,
        },
      ];
      state.boSuuTap.fileList = imgTemp;
      state.loading = false;
    });
    builder.addCase(fetchByIdBST.rejected, (state, action) => {
      state.loading = false;
      state.boSuuTap = {};
    });
    //fetchPostBST
    builder.addCase(fetchPostBST.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPostBST.fulfilled, (state, action) => {
      state.loading = false;
      state.boSuuTaps = [...state.boSuuTaps, action.payload];
    });
    builder.addCase(fetchPostBST.rejected, (state) => {
      state.loading = false;
    });
    //fetchPutBST
    builder.addCase(fetchPutBST.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPutBST.fulfilled, (state, action) => {
      state.loading = false;
      notification.open({
        message: "Cập nhật thành công!",
        type: "success",
      });
    });
    builder.addCase(fetchPutBST.rejected, (state) => {
      state.loading = false;
      notification.open({
        message: "Cập nhật thất bại!",
        type: "error",
      });
    });
    //fetchGetProductByBST
    builder.addCase(fetchGetProductByBST.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGetProductByBST.fulfilled, (state, action) => {
      state.loading = false;
      state.boSuuTaps = action.payload;
      let productsTemp = [...action.payload];
      productsTemp.forEach((product) => {
        product.colorGrouped = Object.values(
          GroupBy(product.sanPhams, "idColor")
        );
        product.imgsDisplay = URLConvert(
          Object.values(GroupBy(product.sanPhams, "idColor"))[0][0]
            ?.chiTietHinhAnhs || [],
          product.maSanPham
        );
      });
      state.products = [...productsTemp];
    });
    builder.addCase(fetchGetProductByBST.rejected, (state, action) => {
      state.loading = false;
    });
    //fetchDeleteBST
    builder.addCase(fetchDeleteBST.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDeleteBST.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.meta.arg;
      let temp = [...state.boSuuTaps];
      let obj = temp.find((x) => x.id == id);
      let index = temp.indexOf(obj);
      if (index != -1) {
        temp.splice(index, 1);
        state.boSuuTaps = temp;
      }
    });
    //fetchDeleteBST
    builder.addCase(fetchDeleteBST.rejected, (state) => {
      state.loading = false;
    });
    //fetchUploadImgBST
    builder.addCase(fetchUploadImgBST.fulfilled, (state, action) => {
      const res = action.payload;
      var imgTemp = [
        {
          uid: res.img,
          name: res.img,
          status: "done",
          // custom error message to show
          url: `https://localhost:44328/wwwroot/res/BstImgs/${res.img.trim()}`,
          ...state.boSuuTap.img,
        },
      ];
      state.boSuuTap.fileList = imgTemp;
    });
    builder.addCase(fetchUploadImgBST.rejected, (state, action) => {
      console.log(action);
    });
    //fetchRemoveImgBST
    builder.addCase(fetchRemoveImgBST.fulfilled, (state, action) => {
      state.boSuuTap.fileList = [];
    });
    builder.addCase(fetchRemoveImgBST.rejected, (state, action) => {
      notification.open({
        message: "Có lỗi xảy ra!",
        type: "error",
      });
    });
    //fetchRemoveProductsFormBST
    builder.addCase(fetchRemoveProductsFormBST.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRemoveProductsFormBST.fulfilled, (state, action) => {
      state.loading = false;
      const { id } = action.meta.arg;
      let temp = state.products;
      let obj = temp.find((x) => x.maSanPham.trim() == id);
      console.log({ obj });
      let index = temp.indexOf(obj);
      if (index > -1) {
        temp.splice(index, 1);
        state.boSuuTaps = [...temp];
      }
    });
    builder.addCase(fetchRemoveProductsFormBST.rejected, (state, action) => {
      state.loading = false;
      notification.open({
        message: action.payload,
        type: "error",
      });
    });
  },
});

export default BSTSlice;
