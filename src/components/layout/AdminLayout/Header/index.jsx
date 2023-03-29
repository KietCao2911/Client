import React, { useState } from "react";
import "./Header.scss";
import { SearchOutlined, SmileOutlined } from "@ant-design/icons";
import { Avatar, Image, Menu, Dropdown, List } from "antd";
const data = [
  {
    title: "Ant Design Title 1",
    src: "https://images.pexels.com/photos/12328375/pexels-photo-12328375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Ant Design Title 2",
    src: "https://images.pexels.com/photos/12328375/pexels-photo-12328375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Ant Design Title 3",
    src: "https://images.pexels.com/photos/12328375/pexels-photo-12328375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    title: "Ant Design Title 4",
    src: "https://images.pexels.com/photos/12328375/pexels-photo-12328375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];
const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            1st menu item
          </a>
        ),
      },
      {
        key: "2",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            2nd menu item (disabled)
          </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
      },
      {
        key: "3",
        label: (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        key: "4",
        danger: true,
        label: "a danger item",
      },
    ]}
  />
);

const MyHeader = () => {
  const [openAddProduct, setAddProduct] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClickAvatar = () => {
    setOpen(!open);
  };
  return (
    <div className="Header_Content">
      <div className="Search_Input" style={{ position: "relative" }}>
        <div className="SearchInput_Component">
          <SearchOutlined size={30} />
          <input placeholder="Tìm kiếm tại đây" />
        </div>
        {/* <div
          className="SearchResult"
          style={{
            padding: "1rem",
            width: "100%",
            position: "absolute",
            left: 0,
            top: "calc(100% + 2rem)",
            zIndex: 99,
            background: "white",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}
        >
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.src} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </div> */}
      </div>
      <div className="user_profile">
        <Dropdown overlay={menu}>
          <Avatar
            src={
              <Image
                onClick={handleClickAvatar}
                preview={false}
                src="https://images.pexels.com/photos/12357683/pexels-photo-12357683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                style={{
                  width: 32,
                  cursor: "pointer",
                }}
              />
            }
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default MyHeader;
