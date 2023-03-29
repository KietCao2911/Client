import { async } from "@firebase/util";
import * as Method from "~/axiosRequest/request";

export const getKhachHangs =async()=>
{
    try {
        const res = await Method.Get("/api/admin/KhachHang")
        return res;
    } catch (error) {
        throw error
    }
}
export const getKhachHang =async(id)=>
{
    try {
        const res = await Method.Get("/api/admin/KhachHang/"+id)
        return res;
    } catch (error) {
        throw error
    }
}
export const postKhachHang =async(body)=>
{
    try {
        const res = await Method.Post("/api/admin/KhachHang",body)
        return res;
    } catch (error) {
        throw error
    }
}
export const PutKhachHang =async(id,body)=>
{
    try {
        const res = await Method.Put(`/api/admin/KhachHang/${id}`,body)
        return res;
    } catch (error) {
        throw error
    }
}