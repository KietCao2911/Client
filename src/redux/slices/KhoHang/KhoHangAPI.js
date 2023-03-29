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
export const fetchGetProducts =async(maChiNhanh,query)=>
{   
    console.log({query});
    try {
        const res = await request.Get("/api/admin/KhoHang/GetProducts/"+maChiNhanh,{params:query});
        return res;
    } catch (error) {
        throw error
    }
}