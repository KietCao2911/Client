import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as GiaoHangNhanhApi from "./GhnApi"
const initialState={
    Provinces:{},
    Districts:{},
    Wards:{},
    Loading:{
        Provinces:false,
        Districts:false,
        Wards:false,
    },
    FeeInfo:{},
    DistrictID:""
}
export const fetchGetProvinces =createAsyncThunk(
    "GiaoHangNhanh/fetchGetProvinces",async()=>
    {
        const res = await GiaoHangNhanhApi.fetchGetProvince();
        return res;
    }
)
export const fetchGetDistrict =createAsyncThunk(
    "GiaoHangNhanh/fetchGetDistrict",async(id)=>
    {
        const res = await GiaoHangNhanhApi.fetchGetDistrict(id);
        return res;
    }
)
export const fetchGetWard =createAsyncThunk(
    "GiaoHangNhanh/fetchGetWard",async(id)=>
    {
        const res = await GiaoHangNhanhApi.fetchGetWard(id);
        return res;
    }
)
export const fetchPostCalFee = createAsyncThunk("GiaoHangNhanh/fetchPostCalFee",async(body)=>
{
    const res = await GiaoHangNhanhApi.getFeeGHN(body);
    return res;
})
const GhnSlice = createSlice({
    name:"GiaoHangNhanh",
    initialState,
    extraReducers:(builder)=>
    {
        builder.addCase(fetchGetProvinces.pending,(state)=>
        {
          state.Loading.Provinces=true;
                        
        })
        builder.addCase(fetchGetProvinces.fulfilled,(state,action)=>
        {
            state.Provinces = action.payload
            state.Districts ={}
            state.Wards={}
            state.Loading.Provinces=false;
        })
        builder.addCase(fetchGetDistrict.pending,(state,action)=>
        {
            state.Wards ={};
            state.FeeInfo={}
            state.Districts ={}
            state.Loading.Districts=true;
        })
        builder.addCase(fetchGetDistrict.fulfilled,(state,action)=>
        {
            state.Districts = action.payload;
            state.Wards={}
            state.Loading.Districts=false;
        })
        builder.addCase(fetchGetWard.pending,(state,action)=>
        {
                state.Wards={}
                state.FeeInfo={}
                state.Loading.Wards=true;
        })
        builder.addCase(fetchGetWard.fulfilled,(state,action)=>
        {
            state.DistrictID = action.payload.data.DistrictID
            state.Wards = action.payload;
            state.Loading.Wards=false;
        })
        builder.addCase(fetchPostCalFee.fulfilled,(state,action)=>
        {
            console.log({feeInfo:action.payload})
            state.FeeInfo = action.payload;
        })
    }
})
export default GhnSlice