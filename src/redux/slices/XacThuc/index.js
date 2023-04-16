import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as Api from "./XacThucApi";
import *as  MeAPI from "~/redux/slices/MeSlice/MeApi"
import { notification } from "antd";
const initialState = {
  user: {},
  token: "",
  emailValidateStatus:false,
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
    //EmailRegister
    export const EmailRegister = createAsyncThunk("EmailRegister",async(params)=>
{
  const {body} = params;
  const res = Api.EmailRegister(body)
  return res;
})
//EmailSignIn
export const EmailSignIn = createAsyncThunk("EmailSignIn",async(params)=>
{
  const {body} = params;
  const res = Api.EmailSignIn(body)
  return res;
})
//EmailVerify
export const EmailVerify = createAsyncThunk("EmailVerify",async(params)=>
{
  const {token} = params;
  const res = Api.EmailVerify(token)
  return res;
})
const XacThucSlice = createSlice({
  name: "XacThuc",
  initialState,
  extraReducers: (builder) => {
    //EmailRegister
    builder.addCase(EmailRegister.pending,(state)=>
    {
      state.loading=true;
    })
    builder.addCase(EmailRegister.fulfilled,(state,action)=>
    {
      state.loading=false;
      notification.open({
        message:"Tạo tài khoản thành công, vui lòng xác nhận trong email của bạn",
        type:"success"
      })
    })
    builder.addCase(EmailRegister.rejected,(state,action)=>
    {
      state.loading=false;
      const message   = action.error.message;
      notification.open({
        message,
        type:"error"
      })
    })
//EmailSignIn
builder.addCase(EmailSignIn.pending,(state)=>
{
  state.loading=true;
})
builder.addCase(EmailSignIn.fulfilled,(state,action)=>
{
  state.user = action.payload.info;
  state.token = action.payload.token;
  window.location.replace("/");
  localStorage.setItem("access__token", action.payload.token);
  localStorage.setItem("refresh__token", action.payload.refreshToken);
  if(state.user.role==1)
  {
    window.location.replace("/admin")
  }
  state.loading=false
  
})
builder.addCase(EmailSignIn.rejected,(state,action)=>
{
  state.loading=false;
  const message   = action.error.message;
  notification.open({
    message,
    type:"error"
  })
})
//EmailVerify
builder.addCase(EmailVerify.pending,(state)=>
{
  state.loading=true;
  state.emailValidateStatus=false
})
builder.addCase(EmailVerify.fulfilled,(state,action)=>
{
  state.loading=false;
  state.emailValidateStatus=true;
  notification.open({
    message:"Xác thực thành công",
    type:"success"
  })
})
builder.addCase(EmailVerify.rejected,(state)=>
{
  state.emailValidateStatus=false
  state.loading=false;
})
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
    builder.addCase(fetchDeleteAddress.pending,(state,action)=>
    {
      state.loading=true
    })
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
      state.loading=false;
    })
    builder.addCase(fetchDeleteAddress.rejected,(state,action)=>
    {
      state.loading=false
    })
    //fetchChangeAddressDefault
    builder.addCase(fetchChangeAddressDefault.pending,(state,action)=>
    {
     state.loading=true
    })
    builder.addCase(fetchChangeAddressDefault.fulfilled,(state,action)=>
    {
      const {body} = action.meta.arg
      console.log(action.meta.arg)
      state.user.addressDefault = body.addressDefault;
      state.loading=false;
      notification.open({
        type:"success",
        message:"Đã cập nhật địa chỉ giao hàng mặc định"
      })
    })
    builder.addCase(fetchChangeAddressDefault.rejected,(state,action)=>
    {
     state.loading=false
    })
    //fetchAddAddress
    builder.addCase(fetchAddAddress.pending,(state,action)=>
    {
     
      state.loading=true;
    })
    builder.addCase(fetchAddAddress.fulfilled,(state,action)=>
    {
      console.log({payload:action.payload})
      state.user.info=[...state.user.info,action.payload];
      state.loading=false;
    })
    builder.addCase(fetchAddAddress.rejected,(state,action)=>
    {
     
      state.loading=false;
    })
    builder.addCase(fetchGetCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    //fetchPostSignUser
    builder.addCase(fetchPostSignUser.pending, (state, action) => {
     
        state.loading=true
    });

    builder.addCase(fetchPostSignUser.fulfilled, (state, action) => {
      state.user = action.payload.info;
      state.token = action.payload.token;
      window.location.replace("/");
      localStorage.setItem("access__token", action.payload.token);
      localStorage.setItem("refresh__token", action.payload.refreshToken);
      if(state.user.role==1)
      {
        window.location.replace("/admin")
      }
      state.loading=false

    });
    builder.addCase(fetchPostSignUser.rejected, (state, action) => {
      notification.open({
        message:"Thao tác thất bại",
        type:"error"
      })
      state.loading=false

    });
  },
});

export default XacThucSlice;
