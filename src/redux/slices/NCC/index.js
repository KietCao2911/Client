import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import * as NCCAPI from "./NCCAPI"
export const fetchGetNCC = createAsyncThunk("fetchGetNCC",async(params)=>
{
    const res = await NCCAPI.GetNCC(params);
    return res;
})
export const fetchPostNCC = createAsyncThunk("fetchPostNCC",async(params)=>
{
    const {body} = params;
    const res = await NCCAPI.PostNCC(body);
    return res;
})

const NCCSlice = createSlice({
    initialState:{
        nccs:[],
        ncc:{},
        loading:false,
    },
    name:"NCC",
    extraReducers:builder=>
    {
        builder.addCase(fetchGetNCC.fulfilled,(state,action)=>
        {
            state.nccs = action.payload;
        })
        builder.addCase(fetchPostNCC.fulfilled,(state,action)=>
        {
            state.nccs = [...state.nccs,action.payload];

        })
    }
})

export default NCCSlice