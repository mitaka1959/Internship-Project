import React from "react";
import { Menu, Layout } from "antd";

const { Sider } = Layout;

interface EditHotelSidebarProps {
  selectedSection: string;
  setSelectedSection: (key: string) => void;
}

const EditHotelSidebar: React.FC<EditHotelSidebarProps> = ({
  selectedSection,
  setSelectedSection,
}) => {
  return (
    <Sider
      width={200}
      style={{
        background: "f0f2f5",
        borderRight: "1px solid #ddd",
        marginTop: "64px",
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[selectedSection]}
        onClick={(e) => setSelectedSection(e.key)}
        style={{ height: "100%", borderRight: 0 }}
      >
        <Menu.Item key="property">Property Details</Menu.Item>
        <Menu.Item key="rooms">Room Setup</Menu.Item>
        <Menu.Item key="media">Media & Policies</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default EditHotelSidebar;
