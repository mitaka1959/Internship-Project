import { Menu, Divider, Card, Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "C:/Users/dimit/source/repos/EasyStays/FrontEnd/easy-stays-frontend/src/assets/logo.png";
import {
  HomeOutlined,
  CalendarOutlined,
  DollarOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: 220,
        height: "100vh",
        backgroundColor: "#023047",
        position: "fixed",
        left: 0,
        top: 0,
        color: "white",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "0.5rem",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="EasyStays Logo"
          style={{
            width: "100%",
            height: "180px",
            objectFit: "contain",
            marginBottom: "0.5rem",
          }}
        />
      </div>
      <Menu
        mode="vertical"
        theme="dark"
        style={{
          backgroundColor: "#023047",
          color: "white",
          width: "100%",
          borderInlineEnd: "none",
        }}
        onClick={({ key }) => navigate(key)}
      >
        <Menu.Item
          key="/dashboard"
          icon={<HomeOutlined style={{ fontSize: "20px" }} />}
          style={{ color: "white", fontSize: "18px", padding: "7px 24px" }}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="/my_hotels"
          icon={<PlusOutlined style={{ fontSize: "20px" }} />}
          style={{ color: "white", fontSize: "18px", padding: "7px 24px" }}
        >
          My Hotels
        </Menu.Item>
        <Menu.Item
          key="/reservations"
          icon={<CalendarOutlined style={{ fontSize: "20px" }} />}
          style={{ color: "white", fontSize: "18px", padding: "7px 24px" }}
        >
          Reservations
        </Menu.Item>
        <Menu.Item
          key="/earnings"
          icon={<DollarOutlined style={{ fontSize: "20px" }} />}
          style={{ color: "white", fontSize: "18px", padding: "7px 24px" }}
        >
          Earnings
        </Menu.Item>
      </Menu>

      <Divider
        style={{ backgroundColor: "white", width: "80%", margin: "1rem auto" }}
      />

      <Menu
        mode="vertical"
        theme="dark"
        style={{
          backgroundColor: "#023047",
          color: "white",
          width: "100%",
          borderInlineEnd: "none",
        }}
        onClick={({ key }) => navigate(key)}
        items={[
          { label: "Settings", key: "/settings" },
          { label: "Help", key: "/help" },
        ]}
      />

      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <Avatar
          size={64}
          icon={<AntDesignOutlined />}
          style={{ backgroundColor: "#FB8500" }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
