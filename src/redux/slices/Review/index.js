import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import * as ReviewAPI from "./ReviewAPI"
import { notification } from "antd";
export const AddProductRating=createAsyncThunk("AddProductRating",async(body)=>
{
    const res = await ReviewAPI.AddProductRating(body);
    return res;
})
export const GetOrderRating=createAsyncThunk("GetOrderRating",async(params)=>
{
    const {id,token} = params
    const res = await ReviewAPI.GetOrderRating(id,{token});
    return res;
})

const ReviewSlice=createSlice({
    initialState:{
        reviews:[],
        review:{},
        hoadon:{},
        loading:false,
    },
    name:"Review",
    extraReducers:(builder)=>
    {
        //GetOrderRating
        builder.addCase(GetOrderRating.pending,(state)=>
        {
            state.loading = true;
        })
        builder.addCase(GetOrderRating.fulfilled,(state,action)=>
        {
            state.hoadon=action.payload;
            state.loading=false;
        })
        builder.addCase(GetOrderRating.rejected,(state,action)=>
        {
            state.loading=false;
        })
        //AddProductRating
        builder.addCase(AddProductRating.pending,(state)=>
        {
            state.loading = true;
        })
        builder.addCase(AddProductRating.fulfilled,(state,action)=>
        {
            notification.open({
                message:"Cảm ơn đánh giá của bạn",
                type:"success",
            })
            setTimeout(()=>
            {
                // window.location.replace("/")
            },1000)
            state.loading = false;
        })
        builder.addCase(AddProductRating.rejected,(state,action)=>
        {
            state.loading=false;
            notification.open({
                message:"Sản phẩm đã được đánh giá",
                type:"info",
            })
            // setTimeout(()=>
            // {
            //     window.location.replace("/")
            // },2000)
        })
    }
})
export default ReviewSlice;