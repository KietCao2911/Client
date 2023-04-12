import React, { useState } from "react";
import ActionSideBar from "~/components/layout/AdminLayout/ActionSideBar";
import MyHeader from "~/components/layout/AdminLayout/Header";
import "./AdminLayout.scss";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;
const AdminAuthLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Sider
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
      <Layout className="Admin_Body">
        <Content> {children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminAuthLayout;
