import React, { useState } from "react";
import ActionSideBar from "~/components/layout/AdminLayout/ActionSideBar";
import MyHeader from "~/components/layout/AdminLayout/Header";
import "./AdminLayout.scss";
import { Avatar, Layout } from "antd";
import HeaderMainHome from "../DefaultLayout/Header";
import HeaderAdmin from "../AdminAuthLayout/components/Header";
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
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
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
