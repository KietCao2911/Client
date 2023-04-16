import * as request from "~/axiosRequest/request";

export const fetchGetKhoHang = async(maSP)=>
{
    try {
        const res = await request.Get("api/admin/KhoHang/"+maSP)
        return res;
    } catch (error) {
        throw error
    }
}
export const fetchGetProducts =async(params)=>
{   
    try {
        const res = await request.Get("/api/admin/KhoHang/GetProducts",{params});
        return res;
    } catch (error) {
        throw error
    }
}