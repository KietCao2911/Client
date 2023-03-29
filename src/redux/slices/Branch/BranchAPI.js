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