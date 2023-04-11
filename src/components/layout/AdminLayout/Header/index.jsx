import React, { useState } from "react";
import "./Header.scss";
import { SearchOutlined, SmileOutlined } from "@ant-design/icons";
import { Avatar, Image, Menu, Dropdown, List } from "antd";

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
      </div>
      <div className="user_profile">
        <Dropdown menu={menu}>
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
