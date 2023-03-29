import QuanTriDanhMuc from "~/area/admin/components/pages/QuanTriDanhMuc";
import QuanTriSanPham from "~/area/admin/components/pages/QuanTriSanPham";
// import CapNhatSanPham from "../pages/QuanTriSanPham/components/CapNhatSanPham";
import SuaDanhMuc from "../pages/QuanTriDanhMuc/components/SuaDanhMuc";
import QuanTriBST from "../pages/QuanTriBoSuuTap";
import { lazy } from "react";
const HomeAdmin = lazy(() => import("~/area/admin/components/pages/HomeAdmin"));
const ThongKeDoanhThu = lazy(() =>
  import("~/area/admin/components/pages/ThongKeDoanhThu")
);
const QuanTriBoSuuTap = lazy(() => import("../pages/QuanTriBoSuuTap/index"));
const CapNhatSanPham = lazy(() =>
  import("../pages/QuanTriSanPham/components/CapNhatSanPham")
);
const QuanTriDonHang = lazy(() => import("../pages/QuanTriDonHang/"));

const TrangQuanTriNhapHang = lazy(() =>
  import("../pages/QuanTriNhapHang/index")
);
const BaoCaoNhapXuat = lazy(() => import("../pages/BaoCaoNhapXuat"));
const QuanTriKhachHang = lazy(() => import("../pages/QuanTriKhachHang"));
export const adminRoute = [
  {
    path: "/admin",
    element: HomeAdmin,
    layout: "admin",
  },
  {
    path: "/admin/quan-tri-bo_suu_tap/*",
    element: QuanTriBoSuuTap,
    layout: "admin",
  },
  {
    path: "/admin/thong-ke-doanh-thu/*",
    element: ThongKeDoanhThu,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-san-pham/*",
    element: QuanTriSanPham,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-khach-hang/*",
    element: QuanTriKhachHang,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-danh-muc",
    element: QuanTriDanhMuc,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-don-hang/*",
    element: QuanTriDonHang,
    layout: "admin",
  },
  {
    path: "/admin/trang-bao-cao-nhap-xuat",
    element: BaoCaoNhapXuat,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-nhap-hang/*",
    element: TrangQuanTriNhapHang,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-danh-muc/chinh-sua/:maDM",
    element: SuaDanhMuc,
    layout: "admin",
  },
  {
    path: "/admin/trang-quan-tri-bo-suu-tap",
    element: QuanTriBST,
    layout: "admin",
  },
];
