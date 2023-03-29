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