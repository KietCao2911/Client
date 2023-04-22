import QuanTriDanhMuc from "~/area/admin/components/pages/QuanTriDanhMuc";
import QuanTriSanPham from "~/area/admin/components/pages/QuanTriSanPham";
import QuanTriBST from "../pages/QuanTriBoSuuTap";
import { lazy } from "react";
import AdminAuthLayout from "~/components/layout/AdminAuthLayout";

import { Archive, DollarSign, File, FileText, Gift, Home, Key, Menu, ShoppingBag, Table, Truck, User, Users } from "react-feather";

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
const QuanTriQuyen = lazy(() => import("../pages/RoleManager"));

export const adminRoute = [
  {
    path: "/admin",
    element: HomeAdmin,
    role:["ADMIN"],
    name:"Trang chính",
    slug: "/admin/",
    icon:<Home/>
  },
  {
    path: "/admin/trang-quan-tri-san-pham/*",
    element: QuanTriSanPham,
    role:["PRODUCT_CREATE","PRODUCT_DELETE","PRODUCT_UPDATE"],
    name:"Quản trị sản phẩm",
    slug: "/admin/trang-quan-tri-san-pham/",
    icon:<Archive/>
  },
  {
    path: "/admin/quan-tri-kho-hang/*",
    element: QuanTriKhoHang,
    name:"Quản trị kho hàng",
    slug: "/admin/quan-tri-kho-hang/",
    role:["KHO_MANAGER"],
    icon:<File/>
  },
  {
    path: "/admin/quan-tri-khuyen_mai/*",
    element: QuanTriKhuyenMai,
    name:"Quản trị khuyến mãi",
    slug: "/admin/quan-tri-khuyen_mai/",
    role:["ADMIN","SALE_MANAGER","STAFF"],
    icon:<Gift/>
  },
  {
    path: "/admin/quan-tri-bo_suu_tap/*",
    element: QuanTriBoSuuTap,
    name:"Quản trị bộ sưu tập",
    slug: "/admin/quan-tri-bo_suu_tap/",
    role:["ADMIN","STAFF"],
    icon:<Table/>,
  },
  {
    path: "/admin/thong-ke-doanh-thu/*",
    element: ThongKeDoanhThu,
    name:"Thống kê doanh thu",
    slug: "/admin/thong-ke-doanh-thu/",
    role:["ADMIN"],
    icon:<DollarSign/>
  },
  {
    path: "/admin/trang-quan-tri-khach-hang/*",
    element: QuanTriKhachHang,
    name:"Quản trị khách hàng",
    slug: "/admin/trang-quan-tri-khach-hang/",
    role:["ADMIN","STAFF"],
    icon:<Users/>
  },
  {
    path: "/admin/quan-tri-danh-muc/*",
    element: QuanTriDanhMuc,
    role:["ADMIN","CATEGORYMANAGER"],
    name:"Quản trị danh mục",
    slug: "/admin/quan-tri-danh-muc/",
    role:["CATE_CREATE","CATE_DELETE","CATE_UPDATE"],
    icon:<Menu/>
  },
  {
    path: "/admin/trang-quan-tri-don-hang/*",
    element: QuanTriDonHang,
    name:"Quản trị đơn hàng",
    slug: "/admin/trang-quan-tri-don-hang/",
    role:["ORDER_CREATE","ORDER_UPDATE","ORDER_DELETE"],
    icon:<ShoppingBag/>
  },
  {
    path: "/admin/trang-bao-cao-nhap-xuat",
    element: BaoCaoNhapXuat,
    name:"Báo cáo nhập xuất",
    slug: "/admin/trang-bao-cao-nhap-xuat",
    role:["ADMIN"],
    icon:<FileText/>
  },
  {
    path: "/admin/trang-quan-tri-nhap-hang/*",
    element: TrangQuanTriNhapHang,
    name:"Quản trị nhập hàng",
    slug: "/admin/trang-quan-tri-nhap-hang/",
    role:["ADMIN"],
    icon:<Truck/>
  },
  {
  path: "/admin/phan-quyen/*",
    element: QuanTriQuyen,
    name:"Phân quyền người dùng",
    slug: "/admin/phan-quyen/",
    role:["PERMISS_EDIT"],
    icon:<Key/>
  },
];
