import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as API from './BrandAPI'

export const fetchGetBrand = createAsyncThunk("fetchGetBrand",async()=>
{
    const res = await API.fetchGetAllBrands();
    return res;
})
export const fetchPostBrand = createAsyncThunk("fetchPostBrand",async(params)=>
{
    const {body} = params;
    const res = await API.fetchPostBrand(body);
    return res;
})

const BrandSlice = createSlice({
    name:"Brand",
    initialState:{
        brands:[],
        loading:false,
    },
    extraReducers:builder=>
    {
        
        builder.addCase(fetchGetBrand.fulfilled,(state,action)=>
        {
            state.brands = action.payload;
        })
        builder.addCase(fetchPostBrand.fulfilled,(state,action)=>
        {
            state.brands = [...state.brands,action.payload];
            notification.open({
                message:"Thêm thành công",
                type:"success"
            })

        })
    }
})

export default BrandSlice