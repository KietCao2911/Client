import QuanTriDanhMuc from "~/area/admin/components/pages/QuanTriDanhMuc";
import QuanTriSanPham from "~/area/admin/components/pages/QuanTriSanPham";
import QuanTriBST from "../pages/QuanTriBoSuuTap";
import { lazy } from "react";
import AdminAuthLayout from "~/components/layout/AdminAuthLayout";

import { Archive, Box, DollarSign, File, FileText, Gift, Home, Key, Menu, Settings, ShoppingBag, Table, Tag, Truck, User, Users } from "react-feather";
import QuanTriCoupon from "../pages/QuanTriCoupon";
import { v4 } from "uuid";

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
const AccountSettings = lazy(() => import("../pages/AccountSettings"));

export const adminRoute = [
  {
    key:v4(),
    path: "/admin",
    element: HomeAdmin,
    role:["HOMEADMIN"],
    name:"Trang chính admin",
    slug: "/admin/",
    icon:<Home/>
  },
  {
    key:v4(),

    path: "/manager",
    element: HomeAdmin,
    role:["HOMEMANAGER"],
    name:"Trang chính quản lý",
    slug: "/manager/",
    icon:<Home/>
  },
  {
    key:v4(),

    path: "/admin/trang-quan-tri-san-pham/*",
    element: QuanTriSanPham,
    role:["PRODMNG"],
    name:"Quản trị sản phẩm",
    slug: "/admin/trang-quan-tri-san-pham/",
    icon:<Box/>
  },
  {
    key:v4(),

    path: "/admin/trang-quan-tri-nhap-hang/*",
    element: TrangQuanTriNhapHang,
    name:"Quản trị nhập hàng",
    slug: "/admin/trang-quan-tri-nhap-hang/",
    role:["PNMANAGER"],
    icon:<Truck/>
  },
  {
    key:v4(),

    path: "/admin/quan-tri-kho-hang/*",
    element: QuanTriKhoHang,
    name:"Quản trị kho hàng",
    slug: "/admin/quan-tri-kho-hang/",
    role:["INVENTORYMNG"],
    icon:<Archive/>
  },

  {
    key:v4(),

    path: "/admin/trang-quan-tri-don-hang/*",
    element: QuanTriDonHang,
    name:"Quản trị đơn hàng",
    slug: "/admin/trang-quan-tri-don-hang/",
    role:["ORDERMNG"],
    icon:<ShoppingBag/>
  },
  {
    key:v4(),

    path: "/admin/quan-tri-coupons/*",
    element: QuanTriCoupon,
    name:"Quản trị coupons",
    slug: "/admin/quan-tri-coupons/",
    role:["COUPONMNG"],
    icon:<Tag/>
  },
  {
    key:v4(),

    path: "/admin/quan-tri-khuyen_mai/*",
    element: QuanTriKhuyenMai,
    name:"Quản trị khuyến mãi",
    slug: "/admin/quan-tri-khuyen_mai/",
    role:["SALEMNG"],
    icon:<Gift/>
  },
  {
    key:v4(),

    path: "/admin/quan-tri-bo_suu_tap/*",
    element: QuanTriBoSuuTap,
    name:"Quản trị bộ sưu tập",
    slug: "/admin/quan-tri-bo_suu_tap/",
    role:["BSTMNG"],
    icon:<Table/>,
  },
  {
    key:v4(),

    path: "/admin/thong-ke-doanh-thu/*",
    element: ThongKeDoanhThu,
    name:"Thống kê doanh thu",
    slug: "/admin/thong-ke-doanh-thu/",
    role:["TKDTMNG"],
    icon:<DollarSign/>
  },
  {
    key:v4(),

    path: "/admin/trang-quan-tri-khach-hang/*",
    element: QuanTriKhachHang,
    name:"Quản trị khách hàng",
    slug: "/admin/trang-quan-tri-khach-hang/",
    role:["CUSTOMERMNG"],
    icon:<Users/>
  },
  {
    key:v4(),

    path: "/admin/quan-tri-danh-muc/*",
    element: QuanTriDanhMuc,
    name:"Quản trị danh mục",
    slug: "/admin/quan-tri-danh-muc/",
    role:["CATEMNG"],
    icon:<Menu/>
  },

  {
    key:v4(),

  path: "/admin/phan-quyen/*",
    element: QuanTriQuyen,
    name:"Phân quyền người dùng",
    slug: "/admin/phan-quyen/",
    role:["ROLEMNG"],
    icon:<Key/>
  },  {
    key:v4(),
    path: "/admin/settings/:id",
    element: AccountSettings,
    role:["COMMONS"],
    name:"Cài đặt tài khoản",
    slug: "/admin/settings",
    icon:<Settings/>
  },
];
