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
export const OrderWithVNPAY =createAsyncThunk("ThanhToanSlice/OrderWithVNPAY",async(body)=>
{
    const res = await ThanhToanApi.OrderWithVNPAY(body);
    return res;
})
export const OrderWithCOD =createAsyncThunk("ThanhToanSlice/fetchPostWithUser",async(body)=>
{
    const res = await ThanhToanApi.OrderWithCOD(body);
    return res;
})
export const OrderWithStripe =createAsyncThunk("ThanhToanSlice/OrderWithStripe",async(body)=>
{
    const res = await ThanhToanApi.OrderWithStripe(body);
    return res;
})
const ThanhToanSlice =createSlice({
    initialState,
    name:"ThanhToan",
    reducers:{
        
    },
    extraReducers:(builder)=>
    {
        //OrderWithStripe
        builder.addCase(OrderWithStripe.pending,(state)=>
        {
            state.loading=true
        })
        builder.addCase(OrderWithStripe.fulfilled,(state,action)=>
        {
            state.loading=false
            window.location.replace(action.payload);
        })
        builder.addCase(OrderWithStripe.rejected,(state)=>
        {
            
            state.loading=false
            alert("Có lỗi xảy ra trong quá trình thanh toán, vui lòng thử lại sau.")
        })
        //OrderWithCOD
        builder.addCase(OrderWithCOD.pending,(state)=>
        {
            state.loading=true;
        })
        builder.addCase(OrderWithCOD.fulfilled,(state,action)=>
        {
            if(action.payload.redirect)
            {
                localStorage.removeItem("cart");
                window.location.replace(action.payload.redirect)
            }
            else{
                state.loading=false;
                notification.open({
                    message:"Đặt hàng thành công.",
                    type:"success",
                })
                localStorage.removeItem("cart");
                window.location.replace("../")
            }
            

        })
        builder.addCase(OrderWithCOD.rejected,(state)=>
        {
            notification.open({
                message:"Đặt hàng thất bại.",
                type:"error",
            })
            state.loading=false;
        })
        //fetchPostWithUser
        builder.addCase(OrderWithVNPAY.pending,(state)=>
        {
            state.loading=true;
        })
        builder.addCase(OrderWithVNPAY.fulfilled,(state,action)=>
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
            //  window.location.replace("/")
        })
        builder.addCase(OrderWithVNPAY.rejected,(state)=>
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