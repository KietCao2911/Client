import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as VatAPI  from "./VatAPI"

export const fetchGetAllVats = createAsyncThunk("fetchGetAllVats",async()=>
{
    const res = await VatAPI.fetchGetAllVats();
    return res;
})
export const fetchPostVat = createAsyncThunk("fetchPostVat",async(params)=>
{
    const {body} = params;
    const res = await VatAPI.fetchPostVat();
    return res
})

const VatSlice = createSlice({
    name:"VatSlice",
    initialState:{
        vats:[],
        vat:{},
        loading:false,
    },
    extraReducers:builder=>
    {
        builder.addCase(fetchGetAllVats.fulfilled,(state,action)=>
        {
            state.vats = action.payload;
        })
        builder.addCase(fetchPostVat.fulfilled,(state,action)=>
        {
            state.vats = [...state.vats,action.payload];
        })
    }
})
export default VatSlice