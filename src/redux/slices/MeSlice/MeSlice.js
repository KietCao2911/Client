import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import *as MeAPI from "./MeApi"
const initialState={
    myOrders:[],
    order:{},
    loading:false
};

export const getMyOrders=createAsyncThunk("Me/getMyOrders",async(params)=>
{
    const {tenTaiKhoan} = params;
    try {
        const res = await MeAPI.GetOrders(tenTaiKhoan)
        return res;
    } catch (error) {
        return error
    }
})
export const getMyOrder=createAsyncThunk("Me/getMyOrder",async(params)=>
{
    const {id} = params;
    try {
        const res = await MeAPI.GetOrder(id)
        return res;
    } catch (error) {
        return error
    }
})


const MeSlice = createSlice({
    initialState,
    name:"MeSlice",
    extraReducers:builder=>
    {
        builder.addCase(getMyOrders.pending,(state,action)=>
        {
            state.loading =true;
        })
        builder.addCase(getMyOrders.fulfilled,(state,action)=>
        {
                state.myOrders = action.payload;
                state.loading =false;
        })
        builder.addCase(getMyOrders.rejected,(state,action)=>
        {
                state.loading =false;
        })
        //getMyOrder
        builder.addCase(getMyOrder.pending,(state,action)=>
        {
                state.loading = true;
        })
        builder.addCase(getMyOrder.fulfilled,(state,action)=>
        {
            state.order= action.payload;
                state.loading = false;
        })
        builder.addCase(getMyOrder.rejected,(state,action)=>
        {
                state.loading = false;
        })
    }
})
export default MeSlice