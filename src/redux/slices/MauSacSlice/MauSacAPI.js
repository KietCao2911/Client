import * as Method from "~/axiosRequest/request";

export const GetAllColors=async()=>
{
    try {
        const res = await Method.Get("/api/MauSac");
        return res;
    } catch (error) {
        throw error;
    }
}
export const PostColor =async(body)=>
{
    try {
        const res = await Method.Post("/api/MauSac",body);
        return res;
    } catch (error) {
        throw error;
    }
}
export const DeleteColor =async(id)=>
{
    try {
        const res = await Method.Delete("/api/MauSac/"+id);
        return res;
    } catch (error) {
        throw error;
    }
}