import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { notification } from "antd";
import * as KhachHangAPI from "./KhachHangApi"
const initialState={
    items:[],
    item:{},
    loading:false,
}
export const fetchGetAllKhachHang =createAsyncThunk("fetchGetAllKhachHang",async(params)=>{
    const {} = params;
    const res = await KhachHangAPI.getKhachHangs();
    return res;
})
export const fetchGetKhachHang =createAsyncThunk("fetchGetKhachHang",async(params)=>{
    const {id} = params;
    const res = await KhachHangAPI.getKhachHang(id);
    return res;
})
export const fetchPutKhachHang =createAsyncThunk("putKhachHang",async(params)=>{
    const {id,body} = params;
    const res = await KhachHangAPI.PutKhachHang(id,body);
    return res;
})
const KhachHangSlice = createSlice({
    initialState,
    name:"KhachHangSlice",
    extraReducers:builder=>
    {
        builder.addCase(fetchGetAllKhachHang.fulfilled,(state,action)=>
        {
            state.items = action.payload
        })
        builder.addCase(fetchGetKhachHang.fulfilled,(state,action)=>
        {
            state.item = action.payload
        })
        builder.addCase(fetchPutKhachHang.fulfilled,(state,action)=>
        {
            notification.open({
                type:"success",
                message:"Cập nhật thành công"
            })
        })
    }
    
})

export default KhachHangSlice