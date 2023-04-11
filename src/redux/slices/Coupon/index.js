import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import * as API from "./CouponAPI"
export const GetCouponsThunk=createAsyncThunk("GetCouponsThunk",async()=>{
    const res= await API.GetCoupons();
    return res;
})
export const GetCouponThunk=createAsyncThunk("GetCouponThunk",async(params)=>{
    const {id} =params
    const res= await API.GetCoupon(id);
    return res;
})
export const PostCouponThunk=createAsyncThunk("PostCouponThunk",async(params)=>{
    const {body} =params
    const res= await API.PostCoupon(body);
    return res;
})
export const PutCouponThunk=createAsyncThunk("PutCouponThunk",async(params)=>{
    const {body} =params
    const res= await API.PutCoupon(body);
    return res;
})
export const DeleteCouponThunk=createAsyncThunk("e",async(params)=>{
    const {id} =params
    const res= await API.DeleteCoupon(id);
    return res;
})

const CouponSlice =createSlice({
    name:"Coupon",
    initialState:{
        coupons:[],
        coupon:{},
        loading:false,
    },
    extraReducers:builder=>
    {
        //GetCouponsThunk
        builder.addCase(GetCouponsThunk.pending,(state)=>
        {
            state.loading=true;
            state.coupons=[];
            state.coupon={};
        })
        builder.addCase(GetCouponsThunk.fulfilled,(state,action)=>
        {
            state.coupons = action.payload;
            state.loading=false;
        })
        //GetCouponThunk
        builder.addCase(GetCouponThunk.pending,(state)=>
        {
            state.loading=true;
            state.coupons=[];
            state.coupon={};
        })
        builder.addCase(GetCouponThunk.fulfilled,(state,action)=>
        {
            state.coupon = action.payload;
            state.loading=false;
        })
        //PostCouponThunk
        builder.addCase(PostCouponThunk.pending,(state)=>
        {
            state.loading=true;
            state.coupons=[];
            state.coupon={};
        })
        builder.addCase(PostCouponThunk.fulfilled,(state,action)=>
        {
            state.coupon = action.payload;
            state.loading=false;
        })
        //PutCouponThunk
        builder.addCase(PutCouponThunk.pending,(state)=>
        {
            state.loading=true;
            state.coupons=[];
            state.coupon={};
        })
        builder.addCase(PutCouponThunk.fulfilled,(state,action)=>
        {
            state.coupon = action.payload;
            state.loading=false;
        })
        //DeleteCouponThunk
    }
})

export default CouponSlice