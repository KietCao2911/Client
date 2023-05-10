import React, { useRef, useState } from "react";
import UserHeader from "./components/UserHeader";
import "./HeaderMainHome.scss";
import MenuComponent from "./components/Menu";
import SearchDrawer from "./components/SearchDrawer";
import shoesLogo from "~/assets/shoesLogo.png";
import MenuMobile from "./components/MenuMobile";
import GioHangSlice from "~/redux/slices/GioHang/GioHangSlice";
import { useDispatch, useSelector } from "react-redux";

import { Badge, Card, Col, Drawer, Input, List, Menu, Modal, Row, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
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
  MapPin,
} from "react-feather";
import CustomDrawer from "~/components/commomComponents/CustomDrawer";
import Location from "~/components/commomComponents/LocationSelect";
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
  const [visiabe, setVisiable] = useState(false);
  const [searchDrawer, setSearchDrawer] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [menuMobileOpen, setMenuMobileOpen] = useState(false);
  const { tongSoLuong } = useSelector((state) => state.GioHang);
  const headerRef = useRef();
  const { items } = useSelector((state) => state.DanhMuc);
  const [data, setData] = useState([]);
  const [searchTexts,setSeachTexts] = useState("")
  const nav = useNavigate();
  const handleRenderItems = (arr) => {
    
    const temp =
      arr &&
      arr.map((item) => {
        return getItem(
          <Link to={`/category/${item.slug.trim()}`}>{item?.tenDanhMuc}</Link>,
          item.id,
          null,
          handleRenderItems(item.children || []),
          null
        );
      });
    return temp;
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
      <Location visiabe={visiabe} setVisiable={setVisiable}></Location>
      <Row className="MainHeader" ref={headerRef}>
        <Col xs={0} xl={{ span: 24 }}>
          <Row align="middle" justify="space-between">
            {/* //LOGO */}
            <Link to="/">
              <div className="Logo">LOGO.</div>
            </Link>
            {/* MENU */}
            <MenuComponent />
            {/* Action */}
            <Col>
              <div className="Actions">
                <Space size={10}>
                <MapPin onClick={()=>setVisiable(!visiabe)} className="icon"/>
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
            <Space >
            <MenuIcon className="icon Bar" onClick={handleOpenMenuDrawer} />
            <MapPin onClick={()=>setVisiable(!visiabe)} className="icon"/>
           
            </Space>
            <Link to="/">
              <div className="Logo">LOGO.</div>
            </Link>

            <Space >
              
              <Search
                className={"icon iconSearch__mobile"}
                onClick={() => setSearchModal(true)}
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
        open={searchModal}
        setOpen={setSearchModal}
        onClose={() => setSearchModal(false)}
        closeIcon={<X />}
      >
        <div className="searchInputContainer">
          <Input onChange={(e)=>{
            setSeachTexts(e.target.value)
          }} placeholder="Tìm kiếm sản phẩm tại đây" addonAfter={<Search onClick={()=>{
            nav("/products?s="+searchTexts)
            setSearchModal(false)
          }}/>} />
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
