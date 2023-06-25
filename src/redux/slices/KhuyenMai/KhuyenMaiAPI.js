import * as Method from '~/axiosRequest/request'
export const GetKhuyenMais =async()=>
{
    try {
        const res = await Method.Get("/api/admin/KhuyenMai")
        return res;
    } catch (error) {
        throw error
    }
}
export const GetProducts=async(params)=>
{
    try {
        const res = await Method.Get("/api/admin/KhuyenMai/SearchProducts",{params})
        return res;
    } catch (error) {
        throw error
    }
}
export const GetKhuyenMai =async(id)=>
{
    try {
        const res = await Method.Get("/api/admin/KhuyenMai/"+id)
        return res;
    } catch (error) {
        throw error
    }
}
export const PostKhuyenMai =async(body)=>
{
    try {
        const res = await Method.Post("/api/admin/KhuyenMai",body)
        return res;
    } catch (error) {
        throw error
    }
}
export const ApplyKhuyenMai =async(body)=>
{
    try {
        const res = await Method.Put("/api/admin/KhuyenMai/Apply",body)
        return res;
    } catch (error) {
        throw error
    }
}
export const CancelKhuyenMai =async(body)=>
{
    try {
        const res = await Method.Put("/api/admin/KhuyenMai/Cancel",body)
        return res;
    } catch (error) {
        throw error
    }
}