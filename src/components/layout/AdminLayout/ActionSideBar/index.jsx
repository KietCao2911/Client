import React from "react";
import { Avatar, Menu } from "antd";
import { DownOutlined, LeftCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import { adminRoute } from "~/area/admin/components/routes";
import { useSelector } from "react-redux";
import { User } from "react-feather";
function ActionSideBar() {
  const { user } = useSelector((state) => state.XacThuc);
  function getItem(label, key, children, icon) {
    return {
      key,
      children,
      label,
      icon
    };
  }
  const ItemsRender=()=>
  {
const    eles = adminRoute.map(route=>
      {
         if(user&&user.role?.some(x=>route?.role?.includes(x?.roleCode?.trim())))
         {
            return getItem(<Link to={route?.slug}>{route?.name}</Link>,v4(),null,route.icon)
            // return getItem(<Link to={route?.slug}>{route?.name}</Link>,v4(),null,route.icon)
         }
      })
      return eles
  }
  const items = [
    getItem(
      <Link to={"/admin"}>Trang chính</Link>,
      "main",
      null,
      <DownOutlined />
    ),

    getItem("Đơn hàng", v4(), [
      getItem(
        <Link to={"/admin/trang-quan-tri-don-hang/tao-moi"}>
          {" "}
          Tạo đơn hàng
        </Link>,
        v4(),
        null,
        null
      ),
      getItem(
        <Link to={"/admin/trang-quan-tri-don-hang"}> Danh sách đơn hàng</Link>,
        v4(),
        null,
        null
      ),
    ]),
     getItem("Sản phẩm", "sub1", [
      getItem(
        <Link to={"/admin/trang-quan-tri-san-pham"}> Sản phẩm</Link>,
        v4(),
        null,
        <DownOutlined />
      ),
      getItem(
        <Link to={"/admin/trang-quan-tri-nhap-hang"}>Nhập hàng</Link>,
        v4()
      ),
      getItem(
        <Link to={"/admin/quan-tri-kho-hang"}>Quản lý kho hàng</Link>,
        v4(),
        null,
        <LeftCircleFilled style={{ color: "white" }} />
      ),
      getItem(
        <Link to={"/admin/quan-tri-bo_suu_tap"}>Bộ sưu tập</Link>,
        v4(),
        null,
        <DownOutlined />
      ),
      getItem(
        <Link to={"/admin/quan-tri-danh-muc"}>Danh mục</Link>,
        v4(),
        null,
        <DownOutlined />
      ),
    ]),
    getItem("Khuyến mãi", v4(), [
      getItem( <Link to={"/admin/quan-tri-khuyen_mai"}>Chương trình khuyến mãi</Link>, v4(), null, null),
      getItem("Mã giảm giá", v4(), null, null),
    ]),

    getItem("Khách hàng", v4(), [
      getItem("Chương trình khuyến mãi", v4(), null, null),
      getItem("Mã giảm giá", v4(), null, null),
    ]),

    getItem("Báo cáo và thống kê", "sub2", [
      getItem(
        <Link to={"/admin/thong-ke-doanh-thu/thoi-gian/tong-quan"}>
          {" "}
          Thống kê doanh thu
        </Link>
      ),
      getItem(<Link to={"/admin/thong-ke-hoa-don/"}> Thống kê hóa đơn</Link>),
      getItem(<Link to={"/admin/thong-ke-mua-hang"}> Thống kê mua hàng</Link>),
      getItem(
        <Link to={"/admin/trang-bao-cao-nhap-xuat"}>
          {" "}
          Báo cáo xuất nhập tồn
        </Link>
      ),
    ]),
  ];
  return (
   <>
  
    <Menu
      
    style={{
      minHeight: "100vh",
      boxShadow:
        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
    }}
    defaultOpenKeys={["sub1"]}
    mode="inline"
    theme="light"
    items={ItemsRender()}
  />
   </>
  );
}

export default ActionSideBar;
