import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message, notification } from "antd";
import * as RoleAPI  from "./RoleAPI"

export const GetRoles =createAsyncThunk("GetRoles",async()=>
{
    const res = await RoleAPI.GetRoles()
    return res;
})
export const GetRolesGroup =createAsyncThunk("GetRolesGroup",async()=>
{
    const res = await RoleAPI.GetRolesGroup()
    return res;
})
export const getStaffs = createAsyncThunk("getStaffs",async()=>
{
    const res = await RoleAPI.getStaffs();
    return res;
})
export const getOneStaff = createAsyncThunk("getOneStaff",async(id)=>
{
    const res = await RoleAPI.GetOneStaff(id);
    return res;
})
export const PostRole = createAsyncThunk("PostRole",async(body)=>
{
    const res = await RoleAPI.PostRole(body);
    return res;
})
export const PostRoleGroup = createAsyncThunk("PostRoleGroup",async(body)=>
{
    const res = await RoleAPI.PostRoleGroup(body);
    return res;
})
export const PutRole = createAsyncThunk("PutRole",async(body)=>
{
    const res = await RoleAPI.PutRole(body);
    return res;
})
export const ChangeRoles = createAsyncThunk("ChangeRoles",async(body)=>
{
    const res = await RoleAPI.ChangeRoles(body);
    return res;
})
const RoleSlice = createSlice({
    name:"Role",
    initialState:{
        roles:[],
        staffs:[],
        staff:{},
        rolesGroup:[],
        loading:false,
    },
    extraReducers:builder=>
    {
        //PostRoleGroup
        builder.addCase(PostRoleGroup.pending,(state)=>
        {
            state.loading= true;
        })
        builder.addCase(PostRoleGroup.fulfilled,(state,action)=>
        {
            state.rolesGroup = [...state.rolesGroup, action.payload]
            state.loading= false;
        })
        builder.addCase(PostRoleGroup.rejected,(state)=>
        {
            state.loading= false;
        })
        //ChangeRoles
        builder.addCase(ChangeRoles.pending,(state)=>
        {
            state.loading= true;
        })
        builder.addCase(ChangeRoles.fulfilled,(state,action)=>
        {
            let rolesGr = [...state.rolesGroup]
            let obj = rolesGr.find(x=>x.groupName==action.payload.groupName);
            if(obj)
            {
                const index = rolesGr.indexOf(obj)
                if(index>-1)
                {
                    rolesGr[index] = action.payload;
                    state.rolesGroup = [...rolesGr]
                }
            }
            state.loading=false;
            message.open({
                content:"Đã thay đổi quyền truy cập",
                type:"success"
            })
        })
        builder.addCase(ChangeRoles.rejected,(state)=>
        {
            state.loading= false;
        })
         // /GetRolesGroup
         builder.addCase(GetRolesGroup.pending,(state)=>
         {
             state.loading= true;
         })
         builder.addCase(GetRolesGroup.fulfilled,(state,action)=>
         {
             state.rolesGroup = action.payload;
             state.loading=false;
         })
         builder.addCase(GetRolesGroup.rejected,(state)=>
         {
             state.loading= false;
         })
        // /GetRoles
        builder.addCase(GetRoles.pending,(state)=>
        {
            state.loading= true;
        })
        builder.addCase(GetRoles.fulfilled,(state,action)=>
        {
            state.roles = action.payload;
            state.loading=false;
        })
        builder.addCase(GetRoles.rejected,(state)=>
        {
            state.loading= false;
        })
        //getOneStaff
        builder.addCase(getOneStaff.pending,(state)=>
        {
            state.loading= true;
        })
        builder.addCase(getOneStaff.fulfilled,(state,action)=>
        {
            state.staff = action.payload;
            state.loading=false;
        })
        builder.addCase(getOneStaff.rejected,(state)=>
        {
            state.loading= false;
        })
        //getStaffs
        builder.addCase(getStaffs.pending,(state)=>
        {
            state.loading= true;
        })
        builder.addCase(getStaffs.fulfilled,(state,action)=>
        {
            state.staffs = action.payload;
            state.loading=false;
        })
        builder.addCase(getStaffs.rejected,(state)=>
        {
            state.loading= false;
        })
        //PostRole
        builder.addCase(PostRole.pending,(state)=>
        {
            state.loading= true;
        })
        builder.addCase(PostRole.fulfilled,(state,action)=>
        {
            state.staffs = [...state.staffs,action.payload];
            state.loading=false;
        })
        builder.addCase(PostRole.rejected,(state)=>
        {
            state.loading= false;
        })
        //PutRole
        builder.addCase(PutRole.pending,(state)=>
        {
            state.loading= true;
        })
        builder.addCase(PutRole.fulfilled,(state,action)=>
        {
            state.staff = action.payload
            state.loading=false;
        })
        builder.addCase(PutRole.rejected,(state)=>
        {
            state.loading= false;
        })
    }
})
export default RoleSlice