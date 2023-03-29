import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import *as MeAPI from "./MeApi"
const initialState={
    myOrders:[],
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


const MeSlice = createSlice({
    initialState,
    name:"MeSlice",
    extraReducers:builder=>
    {
        builder.addCase(getMyOrders.fulfilled,(state,action)=>
        {
                state.myOrders = action.payload;
        })
    }
})
export default MeSlice