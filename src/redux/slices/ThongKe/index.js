import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import * as ThongKeAPI from "./ThongKeAPI"
const  initialState={
    DoanhThu:{
        labels:[],
        values:[],
        details:[]
    },
    XuatNhap:{
        values:[]
    }

}
export const fetchGetDoanhThu = createAsyncThunk("fetchGetDoanhThu",async(params)=>
{
    const {body} = params;
    const res=  await ThongKeAPI.fetchDoanhSo(body);
    return res;
})
export const fetchXuatNhapTon = createAsyncThunk("fetchXuatNhapTon",async(params)=>
{
    const {body} = params;
    const res=  await ThongKeAPI.fetchXuatNhapTon(body);
    return res;
})
const ThongKeSlice =createSlice({
    name:"ThongKeSlice",
    initialState,
    extraReducers:(builder)=>
    {
        builder.addCase(fetchGetDoanhThu.fulfilled,(state,action)=>
        {
           state.DoanhThu.values = action.payload;
})
builder.addCase(fetchXuatNhapTon.fulfilled,(state,action)=>
{
    state.XuatNhap.values= action.payload;
})
    }
    
})

export default ThongKeSlice