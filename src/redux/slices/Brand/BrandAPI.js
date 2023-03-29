import * as Method from "~/axiosRequest/request";

export const fetchGetAllBrands=async()=>
{
    try {
        const res = await Method.Get("/api/admin/Brands");
        return res;
    } catch (error) {
        throw error
    }
}
export const fetchPostBrand=async(body)=>
{
    try {
        const res = await Method.Post("/api/admin/Brands",body);
        return res;
    } catch (error) {
        throw error
    }
}