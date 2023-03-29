import * as Elements from "~/components/pages";
import { GuessAuthLayout } from "../layout";
const publicRoute = [
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
    path: "/dang-nhap",
    element: Elements.AuthPage,
    layout: GuessAuthLayout,
  },
  {
    path: "/dang-nhap/phoneOTP",
    element: Elements.PhoneOTP,
    layout: GuessAuthLayout,
  },
  {
    path: "/dang-ky",
    element: Elements.GuessRegisterForm,
  },
];
const privateRoute = [
  {
    path: "/me/*",
    element: Elements.MePage,
  },
];

export { publicRoute, privateRoute };
