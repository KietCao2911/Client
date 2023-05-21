import * as Method from "~/axiosRequest/request"

export const fetchDoanhSo=async(body)=>
{
try {
    const res = await Method.Post("/api/BaoCao",body);
    return res;
} catch (error) {
    throw error
}
}

export const fetchXuatNhapTon=async(body)=>
{
try {
    const res = await Method.Post("/api/ThongKe/bao-cao-xuat-nhap-ton",body);
    return res;
} catch (error) {
    throw error
}
}