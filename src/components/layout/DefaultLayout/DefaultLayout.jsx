import React from "react";
import HeaderMainHome from "~/components/layout/DefaultLayout/Header";
import FooterMainHome from "~/components/layout/DefaultLayout/Footer";
import { Layout } from "antd";
import { useState } from "react";
import Location from "~/components/commomComponents/LocationSelect";
const { Header, Content, Sider, Footer } = Layout;
const DefaultLayout = ({ children }) => {
  const [visiabe, setVisiable] = useState(() => {
    const location = window.localStorage.getItem("location");

    return location ? false : true;
  });
  return (
    <Layout>
                          <Location visiabe={visiabe}/>
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
