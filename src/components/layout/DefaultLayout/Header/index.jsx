import React, { useRef, useState } from "react";
import UserHeader from "./components/UserHeader";
import "./HeaderMainHome.scss";
import MenuComponent from "./components/Menu";
import SearchDrawer from "./components/SearchDrawer";
import shoesLogo from "~/assets/shoesLogo.png";
import MenuMobile from "./components/MenuMobile";
import GioHangSlice from "~/redux/slices/GioHang/GioHangSlice";
import { useDispatch, useSelector } from "react-redux";

import { Badge, Card, Col, Drawer, List, Menu, Modal, Row, Space } from "antd";
import { Link } from "react-router-dom";
import MyButton from "~/components/commomComponents/Button";
import ModalCustom from "~/components/commomComponents/ModalCustom";
import InputText from "~/components/commomComponents/InputText";
import SearchResult from "./components/SearchResult";
import {
  ShoppingCart,
  Search,
  X,
  LogIn,
  ShoppingBag,
  Menu as MenuIcon,
} from "react-feather";
import CustomDrawer from "~/components/commomComponents/CustomDrawer";
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
function HeaderMainHome() {
  const [searchDrawer, setSearchDrawer] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);
  const { tongSoLuong } = useSelector((state) => state.GioHang);
  const headerRef = useRef();
  const { items } = useSelector((state) => state.DanhMuc);
  const { user } = useSelector((state) => state.XacThuc);
  const [data, setData] = useState([]);
  const handleRenderItems = (arr) => {
    const temp =
      arr &&
      arr.map((item) => {
        return getItem(
          <Link to={`/products?category=${item.slug.trim()}`}>
            {item?.tenDanhMuc}
          </Link>,
          item.id,
          null,
          handleRenderItems(item.children || []),
          null
        );
      });
    return temp;
  };
  const handleOpenSearchDrawer = () => {
    setSearchDrawer(true);
  };
  const handleOpenMenuDrawer = () => {
    setMenuMobileOpen(!menuMobileOpen);
  };
  window.addEventListener("scroll", () => {
    if (headerRef.current) {
      headerRef.current.classList.toggle("sticky", window.scrollY > 100);
    }
  });
  return (
    <div>
      <Row className="MainHeader" ref={headerRef}>
        <Col xs={0} xl={{ span: 24 }}>
          <Row align="middle" justify="space-between">
            {/* //LOGO */}
            <Link to="/">
              <div className="Logo">BLVCK&WH!TE</div>
            </Link>
            {/* MENU */}
            <MenuComponent />
            {/* Action */}
            <Col>
              <div className="Actions">
                <Space size={10}>
                  <div className="Search_Container">
                    <div className="content">
                      <Search
                        className=" icon searchIcon"
                        onClick={() => setSearchModal(true)}
                      />
                    </div>
                  </div>
                  <div className="Cart_Container">
                    <Badge count={tongSoLuong}>
                      <Link to="/gio-hang">
                        {" "}
                        <ShoppingBag className="icon cartIcon" />
                      </Link>
                    </Badge>
                  </div>
                  <div className="UserInfo">
                    <UserHeader />
                  </div>
                </Space>
              </div>
            </Col>
          </Row>
        </Col>
        <Col xl={{ span: 0 }} xs={{ span: 24 }}>
          <Row justify={"space-between"} align="middle">
            <MenuIcon className="icon Bar" onClick={handleOpenMenuDrawer} />
            <Link to="/">
              <div className="Logo">BLVCK&WH!TE</div>
            </Link>

            <Space size={10}>
              <Search
                className={"icon iconSearch__mobile"}
                onClick={handleOpenSearchDrawer}
              />
              <Badge count={tongSoLuong}>
                <Link to="/gio-hang">
                  {" "}
                  <ShoppingBag className="icon cartIcon" />
                </Link>
              </Badge>
              <div className="UserInfo">
                <UserHeader />
              </div>
            </Space>
          </Row>
        </Col>
      </Row>
      <CustomDrawer
        open={menuMobileOpen}
        setOpen={setMenuMobileOpen}
        onClose={() => setMenuMobileOpen(false)}
      >
        <Menu items={handleRenderItems(items) || []} mode={"inline"} />
      </CustomDrawer>
      <CustomDrawer
        open={searchDrawer}
        setOpen={setSearchDrawer}
        onClose={() => setSearchDrawer(false)}
        closeIcon={<X />}
      >
        <div className="searchInputContainer">
          <InputText label="Tìm kiếm sản phẩm tại đây" />
        </div>
        <div className="searchDrawerResult">
          <List
            dataSource={data}
            itemLayout="horizontal"
            renderItem={(item) => {
              return (
                <List.Item.Meta
                  style={{ margin: "1rem 0" }}
                  title={<Link to="/">{item.title}</Link>}
                ></List.Item.Meta>
              );
            }}
          ></List>
        </div>
      </CustomDrawer>
    </div>
  );
}

export default HeaderMainHome;
