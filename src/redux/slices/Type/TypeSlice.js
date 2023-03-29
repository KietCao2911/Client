import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as API from './TypeAPI'

export const fetchGetTypes= createAsyncThunk("Type/fetchGetTypes"
,async()=>
{
    const res = await API.fetchGetAllTypes();
    return res;
})
export const fetchPostTypes= createAsyncThunk("Type/fetchPostTypes"
,async(params)=>
{
    const {body } = params;
    const res = await API.fetchPostTypes(body);
    return res;
})
const initialState={
    types:[],
    loading:false,
}
const TypeSlice = createSlice({
    name:"Type",
    initialState,
    extraReducers:builder=>
    {
        builder.addCase(fetchGetTypes.fulfilled,(state,action)=>
        {
            state.types = [...action.payload];
        })
        builder.addCase(fetchGetTypes.rejected,(state)=>
        {
            state.types=[]
        })
        builder.addCase(fetchPostTypes.fulfilled,(state,action)=>
        {
            state.types = [...state.types,action.payload];
            notification.open({
                message:"Thêm thành công",
                type:"success"
            })
        })
        // builder.addCase(fetchPostTypes.rejected,(state)=>
        // {
            
        // })
    }
})

export default TypeSlice;