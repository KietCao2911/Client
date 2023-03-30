import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { message, notification } from "antd";
import { X } from "react-feather";
import * as GiaoHangNhanhApi from "~/redux/slices/GHNAPI/GhnApi";
let cart = JSON.parse(localStorage.getItem("cart"));
let address = JSON.parse(localStorage.getItem("address"));
const initialState = {
  item: {},
  tongSoLuong: cart?.tongSoLuong || 0,
  thanhTien: cart?.thanhTien || 0,
  chiTietNhapXuats: cart?.chiTietNhapXuats || [],
  phiShip: cart?.phiShip || 0,
  diaChiNavigation: cart?.diaChiNavigation || {},
  couponNavigation: cart?.couponNavigation || {},
  couponCode: cart?.couponCode || null,
  phuongThucThanhToan: cart?.phuongThucThanhToan || "COD",
  loaiPhieu: "PHIEUXUAT",
  infoGuess: {},
  ghnAPI: {
    Provinces: address?.Provinces || {},
    Districts: address?.Districts || {},
    Wards: address?.Wards || {},
    FeeInfo: address?.FeeInfo || {},
    Loading: {
      Provinces: false,
      Districts: false,
      Wards: false,
    },
  },
};
export const fetchGetProvinces = createAsyncThunk(
  "GiaoHangNhanh/fetchGetProvinces",
  async () => {
    const res = await GiaoHangNhanhApi.fetchGetProvince();
    return res;
  }
);
export const fetchGetDistrict = createAsyncThunk(
  "GiaoHangNhanh/fetchGetDistrict",
  async (id) => {
    const res = await GiaoHangNhanhApi.fetchGetDistrict(id);
    return res;
  }
);
export const fetchGetWard = createAsyncThunk(
  "GiaoHangNhanh/fetchGetWard",
  async (id) => {
    const res = await GiaoHangNhanhApi.fetchGetWard(id);
    return res;
  }
);
export const fetchPostCalFee = createAsyncThunk(
  "GiaoHangNhanh/fetchPostCalFee",
  async (body) => {
    const res = await GiaoHangNhanhApi.getFeeGHN(body);
    return res;
  }
);
const GioHangSlice = createSlice({
  initialState,
  name: "GioHang",
  reducers: {
    ViewCart(state, action) {
      let cart = localStorage.getItem("cart");
      let cartObj = JSON.parse(cart);
      if (cartObj) {
        state = cartObj;
      } else {
        state.chiTietNhapXuats = [];
        state.thanhTien = 0;
        state.tongSoLuong = 0;
      }
    },
    AddToCart(state, action) {
      const cart = localStorage.getItem("cart");
      const cartObj = JSON.parse(cart);
      const { maSanPham, donGia, soLuong, sanPhamNavigation } = action.payload;
      if (cartObj) {
        const cartItem = current(state.chiTietNhapXuats).find(
          (x) => x.maSanPham.trim() == action.payload.maSanPham.trim()
        );
        if (cartItem) {
          let index = current(state.chiTietNhapXuats).indexOf(cartItem);
          if (index > -1) {
            state.chiTietNhapXuats[index].soLuong++;
            state.thanhTien += sanPhamNavigation.giaBanLe;
            state.chiTietNhapXuats[index].thanhTien +=
              state.chiTietNhapXuats[index].sanPhamNavigation.giaBanLe;
            // state.phiShip = 0;
            state.tongSoLuong++;
            localStorage.setItem("cart", JSON.stringify(state));
            message.open({
              type: "success",
              content: "Đã thêm sản phẩm vào giỏ hàng",
            });
          }
        } else {
          state.chiTietNhapXuats.push(action.payload);
          state.tongSoLuong++;
          state.thanhTien += sanPhamNavigation.giaBanLe;
          // state.phiShip = 0;
          localStorage.setItem("cart", JSON.stringify(state));
          message.open({
            type: "success",
            content: "Đã thêm sản phẩm vào giỏ hàng",
          });
        }
      } else {
        state.chiTietNhapXuats.push(action.payload);
        state.thanhTien = sanPhamNavigation.giaBanLe;
        state.tongSoLuong += 1;
        localStorage.setItem("cart", JSON.stringify(state));
        message.open({
          type: "success",
          content: "Đã thêm sản phẩm đầu tiên vào giỏ hàng",
        });
      }
    },
    RemoveItem: (state, action) => {
      let chiTietNhapXuats = [...state.chiTietNhapXuats];
      const cartItem = chiTietNhapXuats.find(
        (x) => x.maSanPham.trim() == action.payload.trim()
      );
      if (cartItem) {
        const index = chiTietNhapXuats.indexOf(cartItem);
        if (index > -1) {
          state.tongSoLuong -= cartItem.soLuong;
          state.thanhTien -=
            cartItem.sanPhamNavigation.giaBanLe * cartItem.soLuong || 0;
          chiTietNhapXuats.splice(index, 1);
          if (chiTietNhapXuats.length <= 0) {
            window.localStorage.removeItem("cart");
          }
          state.chiTietNhapXuats = [...chiTietNhapXuats];
          localStorage.setItem("cart", JSON.stringify(state));
          message.open({
            type: "success",
            content: "Đã xóa sản phẩm khỏi giỏ hàng",
            icon: <X />,
          });
        }
      } else {
      }
    },
    UpdateQtyItem: (state, action) => {
      const { maSP, colorId, sizeId, qty } = action.payload;
      let items = [...state.cartItems];
      const obj = items.find(
        (x) =>
          x.maSanPham == maSP &&
          x.color == colorId.colorId.trim() &&
          x.size == sizeId.idSize
      );
      const index = items.indexOf(obj);
      if (index > -1) {
        state.cartItems[index].qty = qty;
        state.totalPrice = state.cartItems[index].giaBan * qty;
        state.finalPrice = state.totalPrice;
        localStorage.setItem("cart", JSON.stringify(state));
        message.open({
          content: "Cập nhật thành công",
          type: "success",
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetProvinces.pending, (state) => {
      state.ghnAPI.Loading.Provinces = true;
      state.ghnAPI.Wards = {};
      state.ghnAPI.Districts = {};
      state.ghnAPI.Provinces = {};
    });
    builder.addCase(fetchGetProvinces.fulfilled, (state, action) => {
      state.ghnAPI.Provinces = action.payload;
      // state.ghnAPI.Districts = {};
      // state.ghnAPI.Wards = {};
      state.finalPrice = state.totalPrice;
      state.ghnAPI.Loading.Provinces = false;
      const addressString = JSON.stringify(state.ghnAPI);
      window.localStorage.setItem("address", addressString);
    });
    builder.addCase(fetchGetDistrict.pending, (state, action) => {
      state.ghnAPI.Wards = {};
      state.ghnAPI.FeeInfo = {};
      state.ghnAPI.Districts = {};
      state.finalPrice = state.totalPrice;
      state.ghnAPI.Loading.Districts = true;
    });
    builder.addCase(fetchGetDistrict.fulfilled, (state, action) => {
      state.ghnAPI.Districts = action.payload;
      state.ghnAPI.Wards = {};
      const addressString = JSON.stringify(state.ghnAPI);
      window.localStorage.setItem("address", addressString);
      state.ghnAPI.Loading.Districts = false;
    });
    builder.addCase(fetchGetWard.pending, (state, action) => {
      state.ghnAPI.Wards = {};
      state.ghnAPI.FeeInfo = {};
      state.ghnAPI.Loading.Wards = true;
      state.finalPrice = state.totalPrice;
    });
    builder.addCase(fetchGetWard.fulfilled, (state, action) => {
      // state.ghnAPI.DistrictID = action.payload.data.DistrictID
      state.ghnAPI.Wards = action.payload;
      const addressString = JSON.stringify(state.ghnAPI);
      window.localStorage.setItem("address", addressString);
      state.ghnAPI.Loading.Wards = false;
    });
    builder.addCase(fetchPostCalFee.fulfilled, (state, action) => {
      const phiShip = action.payload.data.total;
      state.ghnAPI.FeeInfo = action.payload;
      state.phiShip = phiShip || 0;
      state.thanhTien += phiShip;
      const CartString = JSON.stringify(state);
      window.localStorage.setItem("cart", CartString);
    });
    builder.addCase(fetchPostCalFee.rejected, (state, action) => {
      alert("LOI");
    });
  },
});

export const { ViewCart, AddToCart, RemoveItem, UpdateQtyItem } =
  GioHangSlice.actions;

export default GioHangSlice;
