import * as Method from "~/axiosRequest/request";

export const fetchGetAllTypes=async()=>
{
    try {
        const res = await Method.Get("/api/admin/Types");
        return res;
    } catch (error) {
        throw error
    }
}
export const fetchPostTypes=async(body)=>
{
    try {
        const res = await Method.Post("/api/admin/Types",body);
        return res;
    } catch (error) {
        throw error
    }
}