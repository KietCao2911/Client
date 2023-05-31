import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import * as MemberAPI from "./MemberAPI"
export const getAllMembers =createAsyncThunk("getAllMembers",async(params)=>
{
    const res = await MemberAPI.getAllMembers(params);
    return res;
})
export const getMemberByID = createAsyncThunk("getMemberByID",async(id)=>
{
    const res =await MemberAPI.getMemberByID(id);
    return res;
}) 

const MemberSlice =createSlice({
    name:"Member",
    initialState:{
        members:[],
        member:{},
        loading:false,
    },
    extraReducers:builder=>
    {
        builder.addCase(getAllMembers.pending,(state,action)=>
        {
            state.loading =true;
        })
        builder.addCase(getAllMembers.fulfilled,(state,action)=>
        {
            state.members = action.payload||[]
            state.loading =true;
        })
        builder.addCase(getAllMembers.rejected,(state,action)=>
        {
            state.loading =false;
        })
        //getMemberByID
        builder.addCase(getMemberByID.pending,(state)=>
        {
            state.loading=true;
        })
        builder.addCase(getMemberByID.fulfilled,(state,action)=>{
            state.member= action.payload;
            state.loading=false
        })
        builder.addCase(getMemberByID.rejected,(state,action)=>{
            state.loading=false
        })


    }
})
export default MemberSlice