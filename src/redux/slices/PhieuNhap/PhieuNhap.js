import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import * as PhieuNhapAPI from "./PhieuNhapAPI"
import * as CTSLAPI from "../ChiTietSoLuong/CtslAPI"
import { useNavigate } from "react-router-dom";
import { Truck } from "react-feather";
const initialState={
    item:{},
    items:[],
    chiTietPhieuNhaps:[],
    PhieuNhapInfo:{
       
    },
    searchItems:[],
    reload:false,
    loading:false,
}
export const fetchPutNhapKho = createAsyncThunk("fetchPutNhapKho",async(params)=>
{
    const {body} = params;
    const res = await PhieuNhapAPI.fetchPutNhapKho(body);
    return res;

})
export const fetchGetPhieuNhaps =createAsyncThunk("fetchGetPhieuNhaps",async()=>
{
    const res= await PhieuNhapAPI.fetchGetAllPhieuNhap();
    return res;
})
export const fetchGetPhieuNhapID = createAsyncThunk("fetchGetPhieuNhapID",async(params)=>
{
    const {id} = params;
    const res= await PhieuNhapAPI.fetchGetPhieuNhapID(id);
    return res;
})
export const fetchPostPhieuNhaps =createAsyncThunk("fetchPostPhieuNhaps",async(params)=>
{
    const {body} = params;
    const res= await PhieuNhapAPI.fetchPostPhieuNhap(body);
    return res;
})
export const fetchPutPhieuNhaps =createAsyncThunk("fetchPutPhieuNhaps",async(params)=>
{
    const {id,body} = params; 
    const res= await PhieuNhapAPI.fetchPutPhieuNhap(id,body);
    return res;
})
export const fetchGetCTPN =createAsyncThunk("fetchGetCTPN",async(params)=>
{
    const {maPN} = params
    const res = await PhieuNhapAPI.fetchGetAllCTPN(maPN);
    return res;
})
export const fetchPostCTPN = createAsyncThunk("fetchPostCTPN",async(params)=>
{
    const {body} = params;
    const res  = await PhieuNhapAPI.fetchPostCTPN(body)
    return res;
})
export const fetchSearch = createAsyncThunk("fetchSearch",async(params)=>
{
    const {s} = params;
    const res  = await PhieuNhapAPI.FetchSearch(s)
    return res;
})
export const fetchPutCTSL =createAsyncThunk("fetchPutCTSL",async(params)=>
{
    const {id,body} = params;
    const res =  await CTSLAPI.fetchPutCTSL(id,body);
    return res;
})
const PhieuNhapSlice = createSlice({
    initialState,
    name:"PhieuNhap",
    extraReducers:builder=>
    {
        //fetchPutNhapKho
        builder.addCase(fetchPutNhapKho.fulfilled,(state,action)=>
        {
            state.item.daNhapHang = true;
            state.item.steps=3;
            notification.open({
                message:"Đã nhập hàng vào kho",
                type:"success",
                icon:<Truck/>
            })
        })
        //fetchGetPhieuNhapID
        builder.addCase(fetchGetPhieuNhapID.pending,(state)=>
        {
            state.loading=true;
        })
        builder.addCase(fetchGetPhieuNhapID.fulfilled,(state,action)=>
        {
            state.item = {...action.payload};
            state.loading=false;
        })
        builder.addCase(fetchGetPhieuNhapID.rejected,()=>
        {
            window.location.replace("/admin/trang-quan-tri-nhap-hang/")
        })
        //fetchPutCTSL
        builder.addCase(fetchPutCTSL.fulfilled,(state,action)=>
        {
            // const result = action.payload;
            state.reload= !state.reload
        })
        //fetchSearch
        builder.addCase(fetchSearch.fulfilled,(state,action)=>
        {
           state.searchItems = action.payload;
                
        })
        //fetchPutPhieuNhaps
        builder.addCase(fetchPutPhieuNhaps.fulfilled,(state,action)=>
        {
            state.PhieuNhapInfo = action.payload;
                notification.open({
                    message:"Cập nhật thành công"
                })
                
        })
        builder.addCase(fetchGetPhieuNhaps.fulfilled,(state,action)=>
        {
            state.items = action.payload;
        })
        builder.addCase(fetchPostPhieuNhaps.fulfilled,(state,action)=>
        {
            notification.open({
                message:"Tạo thành công",
                type:"success"
            })
            window.location.replace(""+action.payload.id);
        })
        builder.addCase(fetchPostPhieuNhaps.rejected,(state,action)=>
        {
            notification.open({
                message:action.error.message,
                type:"error"
            })
            window.location.replace(""+action.payload.id);
        })
        //fetchGetCTPN
        builder.addCase(fetchGetCTPN.fulfilled,(state,action)=>
        {
            state.PhieuNhapInfo = action.payload[0]?.phieuNhapNavigation ||{}
            let data = []
            const dataTemp = action.payload.map(x=>x.sanPhamNavigation.soLuongDetails.map(item=>
                {
                  data.push({
                    maSanPham:x.sanPhamNavigation.maSanPham,
                    tenSanPham:x.sanPhamNavigation.tenSanPham,
                    maMau:item.maMau,
                    _id:item._id,
                    _idSize:item._idSize,
                    colorLabel:item.idMauSacNavigation.tenMau            ,
                    sizeLabel:item.idSizeNavigation.size1            ,
                    soluong :item.soluong,
                    soluongTon:item.soluongTon,
                    soluongBan:item.soluongBan,
                    giaBan:x.sanPhamNavigation.giaBan
                  })
                }))
            state.chiTietPhieuNhaps = data;
            console.log(action.payload)
            const TongTien = action.payload.reduce((prev,next)=>
            {
                return prev + (next.sanPhamNavigation.giaBan * next.soLuong)
            },0)
            const SoMatHang = data.reduce((prev,next)=>
            {
                return prev + next.soluong
            },0)
            console.log({TongTien})
            state.PhieuNhapInfo.SoMatHang = SoMatHang||0;
            state.PhieuNhapInfo.TongSoLuong =TongTien*1.1||0;
            state.PhieuNhapInfo.TrangThai = action.payload[0]?.phieuNhapNavigation?.status||false
        })
        builder.addCase(fetchPostCTPN.fulfilled,(state,action)=>
        {
            state.reload = !state.reload
            // let x = action.payload||[]
            // let data =[]
            //  x.soLuongDetails.map(item=>
            //     {
            //         data.push( {
            //             maSanPham:x.maSanPham,
            //             tenSanPham:x.tenSanPham,
            //             maMau:item.maMau,
            //             _id:item._id,
            //             _idSize:item._idSize,
            //             colorLabel:item.idMauSacNavigation.tenMau            ,
            //             sizeLabel:item.idSizeNavigation.size1            ,
            //             soluong :item.soluong,
            //             soluongTon:item.soluongTon,
            //             soluongBan:item.soluongBan,
            //             giaBan:x.giaBan
            //           })
            //     })
            // state.chiTietPhieuNhaps = [...state.chiTietPhieuNhaps,...data]
            // const SoMatHang = action.payload.chiTietPhieuNhaps.reduce((prev,next)=>
            // {
            //     return prev + next.soLuong
            // },0)
            // state.PhieuNhapInfo.SoMatHang += SoMatHang||0;
            // state.PhieuNhapInfo.TongSoLuong +=x.giaBan||0;
        })
    }
    
})
export default PhieuNhapSlice