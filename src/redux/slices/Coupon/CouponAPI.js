import * as Method from '~/axiosRequest/request'

export const GetCoupons =async(params)=>
{
    try {
        const res = await Method.Get("/api/admin/CouponController",{params:params})
        return res;
    } catch (error) {
        throw error
    }
}
export const GetCoupon =async(id)=>
{
    try {
        const res = await Method.Get("/api/admin/CouponController/"+id)
        return res;
    } catch (error) {
        throw error
    }
}
export const PostCoupon =async(body)=>
{
    try {
        const res = await Method.Post("/api/admin/CouponController",body)
        return res;
    } catch (error) {
        throw error
    }
}
export const PutCoupon =async(body)=>
{
    try {
        const res = await Method.Put("/api/admin/CouponController",body)
        return res;
    } catch (error) {
        throw error
    }
}
export const DeleteCoupon =async(id)=>
{
    try {
        const res = await Method.Delete("/api/admin/CouponController/"+id)
        return res;
    } catch (error) {
        throw error
    }
}
