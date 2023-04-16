import QuanTriDanhMuc from "~/area/admin/components/pages/QuanTriDanhMuc";
import QuanTriSanPham from "~/area/admin/components/pages/QuanTriSanPham";
import QuanTriBST from "../pages/QuanTriBoSuuTap";
import { lazy } from "react";
import AdminAuthLayout from "~/components/layout/AdminAuthLayout";

const HomeAdmin = lazy(() => import("~/area/admin/components/pages/HomeAdmin"));
const ThongKeDoanhThu = lazy(() =>
  import("~/area/admin/components/pages/ThongKeDoanhThu")
);
const QuanTriBoSuuTap = lazy(() => import("../pages/QuanTriBoSuuTap/index"));
const QuanTriDonHang = lazy(() => import("../pages/QuanTriDonHang/"));
const TrangQuanTriNhapHang = lazy(() =>
  import("../pages/QuanTriNhapHang/index")
);
const BaoCaoNhapXuat = lazy(() => import("../pages/BaoCaoNhapXuat"));
const QuanTriKhachHang = lazy(() => import("../pages/QuanTriKhachHang"));
const QuanTriKhuyenMai = lazy(() => import("../pages/QuanTriKhuyenMai"));
const QuanTriKhoHang = lazy(() => import("../pages/QuanTriKhoHang"));

export const adminRoute = [
  {
    path: "/admin",
    element: HomeAdmin,
  },
  {
    path: "/admin/quan-tri-kho-hang/*",
    element: QuanTriKhoHang,
  },
  {
    path: "/admin/quan-tri-khuyen_mai/*",
    element: QuanTriKhuyenMai,
  },
  {
    path: "/admin/quan-tri-bo_suu_tap/*",
    element: QuanTriBoSuuTap,
  },
  {
    path: "/admin/thong-ke-doanh-thu/*",
    element: ThongKeDoanhThu,
  },
  {
    path: "/admin/trang-quan-tri-san-pham/*",
    element: QuanTriSanPham,
  },
  {
    path: "/admin/trang-quan-tri-khach-hang/*",
    element: QuanTriKhachHang,
  },
  {
    path: "/admin/quan-tri-danh-muc/*",
    element: QuanTriDanhMuc,
  },
  {
    path: "/admin/trang-quan-tri-don-hang/*",
    element: QuanTriDonHang,
  },
  {
    path: "/admin/trang-bao-cao-nhap-xuat",
    element: BaoCaoNhapXuat,
  },
  {
    path: "/admin/trang-quan-tri-nhap-hang/*",
    element: TrangQuanTriNhapHang,
  },
  {
    path: "/admin/trang-quan-tri-bo-suu-tap",
    element: QuanTriBST,
  },
];
