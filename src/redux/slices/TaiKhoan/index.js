import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as TaiKhoanAPI from "./TaiKhoanAPI"

export const getMembers = createAsyncThunk("getMembers",async(params)=>
{
    const res = await TaiKhoanAPI.getMemebers(params)
    return res;
})

const TaiKhoanSlice = createSlice({
    name:"TaiKhoan",
    initialState:{
        taikhoans:[],
        taikhoan:{},
        loading:false,
    },
    extraReducers:(builder)=>
    {
        //getMembers 
        builder.addCase(getMembers.pending,(state)=>
        {
state.loading=true
        })
        builder.addCase(getMembers.fulfilled,(state,action)=>
        {
            state.taikhoans = action.payload
            state.loading =false;
        })
        builder.addCase(getMembers.rejected,(state,action)=>
        {
            state.loading =false;
        })

    }
})
export  default TaiKhoanSlice