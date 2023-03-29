import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as Api from "./XacThucApi";
import *as  MeAPI from "~/redux/slices/MeSlice/MeApi"
import { notification } from "antd";
const initialState = {
  user: {},
  token: "",
  loading:false,
};

export const fetchGetCurrentUser = createAsyncThunk(
  "fetchGetCurrentUser",
  async () => {
    const res = await Api.GetCurrentUser();
    return res;
  }
);

export const fetchPostSignUser = createAsyncThunk(
  "fetchPostSignUser",
  async (params) => {
    const res = await Api.UserSignIn(params);
    return res;
  }
);
export const fetchGetRefreshToken = createAsyncThunk(
  "fetchGetRefreshToken",
  async () => {
    const res = await Api.GetRefreshToken();
    return res;
  }
);
export const fetchAddAddress =createAsyncThunk("fetchAddAddress",async(params)=>
{
  const {body} = params
  const res = await Api.AddAddress(body);
  return res;
})
export const fetchDeleteAddress =createAsyncThunk("fetchDeleteAddress",async(params)=>
{
  const {id} = params
  const res = await Api.DeleteAddress(id);
  return res;
})

export const fetchChangeAddressDefault=createAsyncThunk("fetchChangeAddressDefault",async(params)=>
{
  const {body} = params;
  const res = await MeAPI.ChangeAddressDefault(body);
  return res;
})
export const fetchSetAvatar = createAsyncThunk("fetchSetAvatar",async(params)=>
{
  const {id,body} = params;
  const res = MeAPI.setAvatar(id,body)
  return res;
})
const XacThucSlice = createSlice({
  name: "XacThuc",
  initialState,
  extraReducers: (builder) => {
    //fetchSetAvatar
    builder.addCase(fetchSetAvatar.pending,(state)=>
    {
      state.loading=true;
    })
    builder.addCase(fetchSetAvatar.fulfilled,(state,action)=>
    {
      state.loading=false;
      state.user.avatar =action.payload.fileName;
    })
    //fetchDeleteAddress
    builder.addCase(fetchDeleteAddress.fulfilled,(state,action)=>
    {
      const id = action.payload;
      let data= state.user.info;
      const obj = data.find(x=>x.id==id);
      if(obj)
      {
        const index = data.indexOf(obj);
        if(index>-1)
        {
          state.user.info.splice(index,1);
          notification.open({
            message:"Xóa thành công",
            type:"error"
          })
        }
      }
    })
    //fetchChangeAddressDefault
    builder.addCase(fetchChangeAddressDefault.fulfilled,(state,action)=>
    {
      const {body} = action.meta.arg
      console.log(action.meta.arg)
      state.user.addressDefault = body.addressDefault;
      notification.open({
        type:"success",
        message:"Đã cập nhật địa chỉ giao hàng mặc định"
      })
    })
    //fetchAddAddress
    builder.addCase(fetchAddAddress.fulfilled,(state,action)=>
    {
      console.log({payload:action.payload})
      state.user.info=[...state.user.info,action.payload];
    })
    builder.addCase(fetchGetCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(fetchPostSignUser.fulfilled, (state, action) => {
      state.user = action.payload.info;
      state.token = action.payload.token;
      window.location.replace("/");
      localStorage.setItem("access__token", action.payload.token);
      localStorage.setItem("refresh__token", action.payload.refreshToken);
    });

  },
});

export default XacThucSlice;
