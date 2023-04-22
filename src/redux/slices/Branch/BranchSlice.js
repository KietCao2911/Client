import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as API from './BranchAPI'

export const fetchGetBranch= createAsyncThunk("fetchGetBranch",async()=>
{
    const res = await API.fetchGetAllBranchs();
    return res;
})

export const PostBranch= createAsyncThunk("PostBranch",async(body)=>
{
    const res = await API.PostBranch(body);
    return res;
})
export const PutBranch= createAsyncThunk("PutBranch",async(body)=>
{
    const res = await API.PutBranch(body);
    return res;
})
export const SyncProductsForBranch= createAsyncThunk("SyncProductsForBranch",async(body)=>
{
    const res = await API.SyncProducts(body);
    return res;
})
const BranchSlice = createSlice({
    name:"Branch",
    initialState:{
        branchs:[],
        branch:{},
        loading:false,
    },
    extraReducers:builder=>
    {
        builder.addCase(fetchGetBranch.fulfilled,(state,action)=>
        {
            state.branchs = action.payload;
        })
        //PostBranch
        builder.addCase(PostBranch.pending,(state,action)=>
        {
            state.loading=true;
        })
        builder.addCase(PostBranch.fulfilled,(state,action)=>
        {
            state.branchs = [...state.branchs,action.payload];
            state.loading=false;
        })
        builder.addCase(PostBranch.rejected,(state,action)=>
        {
            state.loading=false;
        })
        //PutBranch
        builder.addCase(PutBranch.pending,(state,action)=>
        {
            state.loading=true;
        })
        builder.addCase(PutBranch.fulfilled,(state,action)=>
        {
            state.branch = action.payload
            state.loading=false;
        })
        builder.addCase(PutBranch.rejected,(state,action)=>
        {
            state.loading=false;
        })
        //SyncProductsForBranch
        builder.addCase(SyncProductsForBranch.pending,(state,action)=>
        {
            state.loading=true;
        })
        builder.addCase(SyncProductsForBranch.fulfilled,(state,action)=>
        {
            state.loading=false;
            window.location.reload();
        })
        builder.addCase(SyncProductsForBranch.rejected,(state,action)=>
        {
            state.loading=false;
        })
    }
})

export default BranchSlice