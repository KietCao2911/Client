import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import * as ThongKeAPI from "./ThongKeAPI"
const  initialState={
    DoanhThu:{
        labels:[],
        values:[],
        details:[]
    },
    XuatNhap:{
        values:[]
    }

}
export const fetchGetDoanhThu = createAsyncThunk("fetchGetDoanhThu",async(params)=>
{
    const {id,body} = params;
    const res=  await ThongKeAPI.fetchDoanhSo(id,body);
    return res;
})
export const fetchXuatNhapTon = createAsyncThunk("fetchXuatNhapTon",async(params)=>
{
    const {body} = params;
    const res=  await ThongKeAPI.fetchXuatNhapTon(body);
    return res;
})
const ThongKeSlice =createSlice({
    name:"ThongKeSlice",
    initialState,
    extraReducers:(builder)=>
    {
        builder.addCase(fetchGetDoanhThu.fulfilled,(state,action)=>
        {
            console.log(action.payload)
                state.DoanhThu.labels = [...action.payload.labels];
                state.DoanhThu.values = [...action.payload.values];
                let data=[];  
  action.payload.details&&action.payload.details.forEach(item=>
    {
        item.forEach(gg=>
          {
            data.push(gg);
          })
    })
    console.log({data})
    state.DoanhThu.details =data;
})
builder.addCase(fetchXuatNhapTon.fulfilled,(state,action)=>
{
    state.XuatNhap.values= action.payload;
})
    }
    
})

export default ThongKeSlice