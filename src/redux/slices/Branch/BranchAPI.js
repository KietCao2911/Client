import * as Method from "~/axiosRequest/request";

export const fetchGetAllBranchs=async()=>
{
    try {
        const res = await Method.Get("/api/admin/Branchs");
        return res;
    } catch (error) {
        throw error
    }
}

export const PostBranch=async(body)=>
{
    try {
        const res = await Method.Post("/api/admin/Branchs",body);
        return res;
    } catch (error) {
        throw error
    }
}
export const PutBranch=async(body)=>
{
    try {
        const res = await Method.Put("/api/admin/Branchs",body);
        return res;
    } catch (error) {
        throw error
    }
}
export const DeleteBranch=async()=>
{
    try {
        const res = await Method.Delete("/api/admin/Branchs");
        return res;
    } catch (error) {
        throw error
    }
}
export const SyncProducts=async(body)=>
{
    try {
        const res = await Method.Post("/api/admin/Branchs/SyncProducts",body);
        return res;
    } catch (error) {
        throw error
    }
}