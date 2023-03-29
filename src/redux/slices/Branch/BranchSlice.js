import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as API from './BranchAPI'

export const fetchGetBranch= createAsyncThunk("fetchGetBranch",async()=>
{
    const res = await API.fetchGetAllBranchs();
    return res;
})

const BranchSlice = createSlice({
    name:"Branch",
    initialState:{
        branchs:[],
        loading:false,
    },
    extraReducers:builder=>
    {
        builder.addCase(fetchGetBranch.fulfilled,(state,action)=>
        {
            state.branchs = action.payload;
        })
    }
})

export default BranchSlice