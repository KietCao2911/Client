import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import * as API from "./KhuyenMaiAPI"
import { message } from "antd";
export const GetKhuyenMaisThunk =createAsyncThunk("GetKhuyenMaisThunk",async()=>
{
    try {
        const res= await API.GetKhuyenMais();
        return res;
    } catch (error) {
        throw error;
    }
})
export const GetKhuyenMaiThunk =createAsyncThunk("GetKhuyenMaiThunk",async(params)=>
{
    const {id} = params;
    try {
        const res= await API.GetKhuyenMai(id);
        return res;
    } catch (error) {
        throw error;
    }
})
export const PostKhuyenMaiThunk =createAsyncThunk("PostKhuyenMaiThunk",async(params)=>
{
    try {
        const {body} = params;
        const res= await API.PostKhuyenMai(body);
        return res;
    } catch (error) {
        throw error;
    }
})
export const PutApplyKhuyenMaiThunk =createAsyncThunk("PutApplyKhuyenMaiThunk",async(params)=>
{
    try {
        const {body} = params;
        const res= await API.ApplyKhuyenMai(body);
        return res;
    } catch (error) {
        throw error;
    }
})
export const PutCancelKhuyenMai =createAsyncThunk("PutCancelKhuyenMai",async(params)=>
{
    try {
        const {body} = params;
        const res= await API.CancelKhuyenMai(body);
        return res;
    } catch (error) {
        throw error;
    }
})
const KhuyenMaiSlice=createSlice({
    name:"KhuyenMai",
    initialState:{
        khuyenmais:[],
        khuyenmai:{},
        loading:false,
    },
    extraReducers:builder=>
    {
        //GetKhuyenMaisThunk
        builder.addCase(GetKhuyenMaisThunk.pending,(state)=>
        {
            state.loading = true;
        })
        builder.addCase(GetKhuyenMaisThunk.fulfilled,(state,action)=>
        {
            state.khuyenmais = action.payload
            state.loading=false;
        })
        //GetKhuyenMaiThunk
        builder.addCase(GetKhuyenMaiThunk.pending,(state)=>
        {
            state.loading = true;
        })
        builder.addCase(GetKhuyenMaiThunk.fulfilled,(state,action)=>
        {
            state.khuyenmai= action.payload
            state.loading=false;
        })
        //PostKhuyenMaiThunk
        builder.addCase(PostKhuyenMaiThunk.pending,(state)=>
        {
            state.loading = true;
        })
        builder.addCase(PostKhuyenMaiThunk.fulfilled,(state,action)=>
        {
            message.open({
                content:"Tạo khuyến mãi thành công",
                type:"success"
            })
            state.khuyenmai= action.payload
            state.loading=false;
            window.location.replace("/admin/quan-tri-khuyen_mai/"+action.payload?.id||"")
        })
        //PutApplyKhuyenMaiThunk
        builder.addCase(PutApplyKhuyenMaiThunk.pending,(state)=>
        {
            state.loading = true;
        })
        builder.addCase(PutApplyKhuyenMaiThunk.fulfilled,(state,action)=>
        {
            state.khuyenmai= action.payload
            state.loading=false;
        })
        //PutCancelKhuyenMai
        builder.addCase(PutCancelKhuyenMai.pending,(state)=>
        {
            state.loading = true;
        })
        builder.addCase(PutCancelKhuyenMai.fulfilled,(state,action)=>
        {
            state.khuyenmai= action.payload
            state.loading=false;
        })
    }
})
export default KhuyenMaiSlice;