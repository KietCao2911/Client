import * as Elements from "~/components/pages";
import { GuessAuthLayout } from "../layout";
import AdminAuthLayout from "../layout/AdminAuthLayout";
import AuthPage from "~/area/admin/components/pages/AuthPage";
import NoneLayout from "../layout/NoneLayout";
const publicRoute = [
  {
    path: "reset_password/:token/:tenTaiKhoan",
    element: Elements.ResetPasswordPage,
    layout: NoneLayout,
  },
  {
    path: "/orderStatus/:orderID/:token",
    element: Elements.OrderResult,
    layout: NoneLayout,
  },
  {
    path: "/verify_email/:token",
    element: Elements.EmailVerifyPage,
    layout: NoneLayout,
  },
  {
    path: "/rating/:orderID/:token",
    element: Elements.RatingPage,
    layout: NoneLayout,
  },
  {
    path: "/admin/auth/*",
    element: AuthPage,
    layout: AdminAuthLayout,
  },
  {
    path: "/",
    element: Elements.Home,
  },
  {
    path: "/collection/:slug/",
    element: Elements.CollectionsPage,
  },
  {
    path: "/category/:category",
    element: Elements.TrangSanPham,
  },
  {
    path: "/brand/:brand",
    element: Elements.TrangSanPham,
  },
  {
    path: "/products",
    element: Elements.TrangSanPham,
  },
  {
    path: "/:slug",
    element: Elements.TrangChiTietSanPham,
  },
  {
    path: "/gio-hang",
    element: Elements.CartPage,
  },
  {
    path: "/giao-hang",
    element: Elements.DeliveryPage,
  },
  {
    path: "/auth/*",
    element: Elements.AuthPage,
    layout: GuessAuthLayout,
  },
];
const privateRoute = [
  {
    path: "/me/*",
    element: Elements.MePage,
  },
];

export { publicRoute, privateRoute };
