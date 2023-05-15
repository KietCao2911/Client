import React, { useState } from "react";
import ActionSideBar from "~/components/layout/AdminLayout/ActionSideBar";
import MyHeader from "~/components/layout/AdminLayout/Header";
import "./AdminLayout.scss";
import { Avatar, FloatButton, Layout } from "antd";
import HeaderMainHome from "../DefaultLayout/Header";
import HeaderAdmin from "../AdminAuthLayout/components/Header";
import { LogOut } from "react-feather";
import { useDispatch } from "react-redux";
import {Logout as SignOut} from "~/redux/slices/XacThuc";
const { Header, Content, Sider } = Layout;
const AdminAuthLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
 return (
    <Layout>
     

      <Layout>
      <Sider
        style={{backgroundColor:"transparent"}}
      collapsible
      collapsed={collapsed} 
        width={280}
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          setCollapsed(collapsed)
        }}
        
      >
        {/* <div className="logo">header</div> */}
        <ActionSideBar />
      </Sider>
      <Content> {children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminAuthLayout;
