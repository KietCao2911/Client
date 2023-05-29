import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { message } from "antd";
import { X } from "react-feather";
import * as GiaoHangNhanhApi from "~/redux/slices/GHNAPI/GhnApi";
import * as ThanhToanAPI from "~/redux/slices/ThanhToanSlice/ThanhToanApi"
let cart = JSON.parse(localStorage.getItem("cart"));
let address = JSON.parse(localStorage.getItem("address"));
let location =
  JSON.parse(window.localStorage.getItem("location"))?.maChiNhanh || null;
const initialState = {
  loadingCoupon:false,
  item: {},
  tongSoLuong: cart?.tongSoLuong || 0,
  thanhTien: cart?.thanhTien || 0,
  tienDaGiam: cart?.tienDaGiam || 0,
  chiTietNhapXuats: cart?.chiTietNhapXuats || [],
  phiShip: cart?.phiShip || 0,
  diaChiNavigation: cart?.diaChiNavigation || {},
  couponNavigation: cart?.couponNavigation || null,
  couponCode: cart?.couponCode || null,
  phuongThucThanhToan: cart?.phuongThucThanhToan || "COD",
  loaiPhieu: "PHIEUXUAT",
  maChiNhanh: location,
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
      FeeCount:false,
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
export const fetchPostApplyCoupon =createAsyncThunk("fetchPostApplyCoupon",async(body)=>
{
  const res= await ThanhToanAPI.fetchPostApplyCoupon(body);
  return res;
})
const GioHangSlice = createSlice({
  initialState,
  name: "GioHang",
  reducers: {
    removeCoupon:(state)=>
        {
            state.couponCode="";
            state.couponNavigation=null;
          
            if(state?.tienDaGiam>0)
            {
              state.thanhTien+=state.tienDaGiam-(state.phiShip||0);
              state.tienDaGiam=0;
            }
            // const addressString = JSON.stringify(state);
            // window.localStorage.setItem("cart", addressString);
            state.loadingCoupon=false;
        },
        
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
          }
        } else {
          state.chiTietNhapXuats.push(action.payload);
          state.tongSoLuong++;
          state.thanhTien += sanPhamNavigation.giaBanLe;
          // state.phiShip = 0;
          localStorage.setItem("cart", JSON.stringify(state));
        }
      } else {
        state.chiTietNhapXuats.push(action.payload);
        state.thanhTien = sanPhamNavigation.giaBanLe;
        state.tongSoLuong += 1;
        localStorage.setItem("cart", JSON.stringify(state));
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
            window.location.replace("/");
          } else {
            state.chiTietNhapXuats = [...chiTietNhapXuats];
            localStorage.setItem("cart", JSON.stringify(state));
          }
        }
      } else {
      }
      
    },
    UpdateQtyItem: (state, action) => {
      const { maSP, qty } = action.payload;
      let items = current(state.chiTietNhapXuats);
      const obj = items.find((x) => x.maSanPham.trim() == maSP.trim());
      const index = items.indexOf(obj);
      if (index > -1) {
        state.chiTietNhapXuats[index].soLuong = qty;
        const pricePrev =state.tongSoLuong = state.chiTietNhapXuats.reduce(
          (x, y) => x + y.donGia*y.soLuong,
          0
        );
        state.thanhTien = pricePrev;
        state.tongSoLuong = state.chiTietNhapXuats.reduce(
          (x, y) => x + y.soLuong,
          0
        );
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
  },
  extraReducers: (builder) => {
    //fetchPostApplyCoupon
    builder.addCase(fetchPostApplyCoupon.pending,(state,action)=>
    {
        state.loadingCoupon=true
    })
    builder.addCase(fetchPostApplyCoupon.fulfilled,(state,action)=>
    {
        if(state.phiShip<=0)
        {
          message.open({
            type:"error",
            content:"Phí giao hàng chưa được tính",
          })
          state.loadingCoupon=false
          return;
        }
        state.thanhTien =action.payload.thanhTien;
        state.couponNavigation = action.payload.couponNavigation;
        state.tienDaGiam = action.payload.tienDaGiam;
        state.couponCode = action.payload.couponCode;
        // const addressString = JSON.stringify(state);
        // window.localStorage.setItem("cart", addressString);
        // state.loadingCoupon=false
    })
    builder.addCase(fetchPostApplyCoupon.rejected,(state,action)=>
    {
        state.loadingCoupon=false
        message.open({
          type:"error",
          content:action.error.message||"promo code invalid"
        })
    })
    builder.addCase(fetchGetProvinces.pending, (state) => {
      state.ghnAPI.Loading.Provinces = true;
      state.ghnAPI.Wards = {};
      state.ghnAPI.Districts = {};
      state.ghnAPI.Provinces = {};

    });
    builder.addCase(fetchGetProvinces.fulfilled, (state, action) => {
      state.ghnAPI.Provinces = action.payload;
      state.ghnAPI.Loading.Provinces = false;
      // const addressString = JSON.stringify(state.ghnAPI);
      // window.localStorage.setItem("address", addressString);
    });
    builder.addCase(fetchGetDistrict.pending, (state, action) => {
      state.ghnAPI.Wards = {};
      state.ghnAPI.FeeInfo = {};
      state.ghnAPI.Districts = {};
      state.finalPrice = state.totalPrice;
      state.ghnAPI.Loading.Districts = true;
      // state.thanhTien -= state.phiShip;
      // state.phiShip = 0;
      // const addressString = JSON.stringify(state.ghnAPI);
      // window.localStorage.setItem("address", addressString);
    });
    builder.addCase(fetchGetDistrict.fulfilled, (state, action) => {
      state.ghnAPI.Districts = action.payload;
      state.ghnAPI.Wards = {};
      // const addressString = JSON.stringify(state.ghnAPI);
      // window.localStorage.setItem("address", addressString);
      state.ghnAPI.Loading.Districts = false;
    });
    builder.addCase(fetchGetWard.pending, (state, action) => {
      state.ghnAPI.Wards = {};
      state.ghnAPI.FeeInfo = {};
      state.ghnAPI.Loading.Wards = true;
      // state.thanhTien -= state.phiShip;
      // state.phiShip = 0;
      // const addressString = JSON.stringify(state.ghnAPI);
      // window.localStorage.setItem("address", addressString);
    });
    builder.addCase(fetchGetWard.fulfilled, (state, action) => {
      // state.ghnAPI.DistrictID = action.payload.data.DistrictID
      state.ghnAPI.Wards = action.payload;
      // const addressString = JSON.stringify(state.ghnAPI);
      // window.localStorage.setItem("address", addressString);
      state.ghnAPI.Loading.Wards = false;
    });
    //fetchPostCalFee
    builder.addCase(fetchPostCalFee.pending, (state, action) => {
      state.ghnAPI.Loading.FeeCount =true;
      if(state.couponCode&&state.tienDaGiam>0)
      {
        state.couponCode="";
        state.couponNavigation=null;
        if(state?.tienDaGiam>0)
        {
          state.thanhTien+=state.tienDaGiam-(state.phiShip||0);
          state.tienDaGiam=0;
        }
        state.loadingCoupon=false; 
      }
    });
    builder.addCase(fetchPostCalFee.fulfilled, (state, action) => {
      const phiShip = action.payload.data.total;
      state.ghnAPI.FeeInfo = action.payload;
      state.phiShip = phiShip || 0;
      
     
      state.ghnAPI.Loading.FeeCount =false;
    });
    builder.addCase(fetchPostCalFee.rejected, (state, action) => {
      message.open({
        content: "Có lỗi xảy ra, vui lòng thử lại",
        type: "error",
      });
      state.ghnAPI.Loading.FeeCount =false;
    });
  },
});

export const { ViewCart, AddToCart, RemoveItem, UpdateQtyItem ,removeCoupon} =
  GioHangSlice.actions;

export default GioHangSlice;
