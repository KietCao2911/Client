import React from "react";
import HeaderMainHome from "~/components/layout/DefaultLayout/Header";
import FooterMainHome from "~/components/layout/DefaultLayout/Footer";
import { Layout } from "antd";
const { Header, Content, Sider, Footer } = Layout;
const DefaultLayout = ({ children }) => {
  return (
    <Layout>
      <Header style={{ backgroundColor: "white", height: "100%" }}>
        <HeaderMainHome />
      </Header>
      <Content style={{backgroundColor:"white"}}>{children}</Content>
      <Footer >
        <FooterMainHome />
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;
