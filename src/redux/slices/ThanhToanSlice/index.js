import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as ThanhToanApi from "./ThanhToanApi"
const initialState={
    loading:false,
    TaiKhoan:{},
    DiaChi:{
        Name:"",
        Phone:"",
        Email:"",
        ProvinceName:"",
        DistrictName:"",
        WardName:"",
        ProvinceID:null,
        DistrictID:null,
        WardId:null,
        AddressDsc:"",
    },
    hoaDonDetails:[],
    totalPrice:0,
    totalQty:0,
    phiShip:0,
    giamGia:0,
}
export const fetchPostWithGuess =createAsyncThunk("ThanhToanSlice/fetchPostWithGuess",async(body)=>
{
    const res = await ThanhToanApi.fetchPostWithGuess(body);
    return res;
})
export const fetchPostWithUser =createAsyncThunk("ThanhToanSlice/fetchPostWithUser",async(body)=>
{
    const res = await ThanhToanApi.fetchPostWithUser(body);
    return res;
})
const ThanhToanSlice =createSlice({
    initialState,
    name:"ThanhToan",
    reducers:{
        AddressInfo:(state,action)=>
        {
            console.log({payload:action.payload})
            state.DiaChi = action.payload;
        },
        ChangeValueField:(state,action)=>
        {
            state[action.payload.key] = action.payload.value;
        }
    },
    extraReducers:(builder)=>
    {
        builder.addCase(fetchPostWithGuess.pending,(state)=>
        {
            state.loading=true;
        })
        builder.addCase(fetchPostWithGuess.fulfilled,(state,action)=>
        {
            state.loading=false;
            if(action.payload.redirect)
            {
                localStorage.removeItem("cart");
                window.location.replace(action.payload.redirect)
            }
            else{
                notification.open({
                    message:"Đặt hàng thành công.",
                    type:"success",
                })
                localStorage.removeItem("cart");
                window.location.replace("/")
            }

        })
        builder.addCase(fetchPostWithGuess.rejected,(state)=>
        {
            state.loading=false;
            notification.open({
                message:"Đặt hàng thất bại.",
                type:"error",
            })
        })
        //fetchPostWithUser
        builder.addCase(fetchPostWithUser.pending,(state)=>
        {
            state.loading=true;
        })
        builder.addCase(fetchPostWithUser.fulfilled,(state,action)=>
        {
            state.loading=false;
            if(action.payload.redirect)
            {
                window.location.replace(action.payload.redirect)
            }
            else{
                notification.open({
                    message:"Đặt hàng thành công.",
                    type:"success",
                })
            }
            state = {};
             window.location.replace("/")
        })
        builder.addCase(fetchPostWithUser.rejected,(state)=>
        {
            state.loading=false;
            notification.open({
                message:"Đặt hàng thất bại.",
                type:"error",
            })
        })
    }
})
export  const {AddressInfo,ChangeValueField} = ThanhToanSlice.actions
export default ThanhToanSlice