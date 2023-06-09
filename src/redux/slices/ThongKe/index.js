import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import * as ThongKeAPI from "./ThongKeAPI"
const  initialState={
    homeAdmin:{},
    hotProducts:[],
    mostviewProducts:[],
    loading:false,
    DoanhThu:{
        labels:[],
        values:[],
        details:[],
       
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
//fetchGetHotHomeAdmin
export const fetchGetHotHomeAdmin = createAsyncThunk("fetchGetHotHomeAdmin",async()=>
{
    const res=  await ThongKeAPI.fetchGetHotHomeAdmin();
    return res;
})
//fetchGetHotProducts
export const fetchGetHotProducts = createAsyncThunk("fetchGetHotProducts",async()=>
{
    const res=  await ThongKeAPI.fetchGetHotProducts();
    return res;
})
//MostViewsProducts
export const MostViewsProducts = createAsyncThunk("MostViewsProducts",async()=>
{
    const res=  await ThongKeAPI.MostViewsProducts();
    return res;
})
const ThongKeSlice =createSlice({
    name:"ThongKeSlice",
    initialState,

    extraReducers:(builder)=>
    {
            //fetchGetHotHomeAdmin
            builder.addCase(fetchGetHotHomeAdmin.pending,(state,action)=>
            {
               state.loading = true;
    })
    builder.addCase(fetchGetHotHomeAdmin.fulfilled,(state,action)=>
    {
       state.homeAdmin = action.payload;
       state.loading = false;
})
builder.addCase(fetchGetHotHomeAdmin.rejected,(state,action)=>
{

    state.loading = false;
})
//fetchGetHotProducts
builder.addCase(fetchGetHotProducts.pending,(state,action)=>
{
   state.loading = true;
})
builder.addCase(fetchGetHotProducts.fulfilled,(state,action)=>
{
state.hotProducts = action.payload;
state.loading = false;
})
builder.addCase(fetchGetHotProducts.rejected,(state,action)=>
{

state.loading = false;
})
//MostViewsProducts
builder.addCase(MostViewsProducts.pending,(state,action)=>
{
   state.loading = true;
})
builder.addCase(MostViewsProducts.fulfilled,(state,action)=>
{
state.mostviewProducts = action.payload;
state.loading = false;
})
builder.addCase(MostViewsProducts.rejected,(state,action)=>
{
state.loading = false;
})
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