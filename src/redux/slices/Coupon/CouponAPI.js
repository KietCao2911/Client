import * as Method from '~/axiosRequest/request'

export const GetCoupons =async(params)=>
{
    try {
        const res = await Method.Get("/api/admin/Coupon",{params:params})
        return res;
    } catch (error) {
        throw error
    }
}
export const GetCoupon =async(id)=>
{
    try {
        const res = await Method.Get("/api/admin/Coupon/"+id)
        return res;
    } catch (error) {
        throw error
    }
}
export const PostCoupon =async(body)=>
{
    try {
        const res = await Method.Post("/api/admin/Coupon",body)
        return res;
    } catch (error) {
        throw error
    }
}
export const PutCoupon =async(body)=>
{
    try {
        const res = await Method.Put("/api/admin/Coupon",body)
        return res;
    } catch (error) {
        throw error
    }
}
export const DeleteCoupon =async(id)=>
{
    try {
        const res = await Method.Delete("/api/admin/Coupon/"+id)
        return res;
    } catch (error) {
        throw error
    }
}
export const StartCoupon =async(id)=>
{
    try {
        const res = await Method.Patch("/api/admin/Coupon/StartApply/"+id)
        return res;
    } catch (error) {
        throw error
    }
}
export const PauseCoupon =async(id)=>
{
    try {
        const res = await Method.Patch("/api/admin/Coupon/PauseApply/"+id)
        return res;
    } catch (error) {
        throw error
    }
}
