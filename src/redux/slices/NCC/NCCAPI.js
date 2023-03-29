import * as Method from "~/axiosRequest/request"

export const GetNCC = async(params)=>
{
    try {
        const res = await Method.Get("/api/admin/NCC",{params});
        return res;
    } catch (error) {
        throw error;
    }
}
export const PostNCC = async(body)=>
{
    try {
        const res = await Method.Post("/api/admin/NCC",body);
        return res;
    } catch (error) {
        throw error;
    }
}