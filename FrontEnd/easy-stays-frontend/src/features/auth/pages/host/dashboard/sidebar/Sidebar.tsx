import { Menu, Divider, Card, Avatar, Dropdown } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "C:/Users/dimit/source/repos/easy-stays-3/Internship-Project/FrontEnd/easy-stays-frontend/src/assets/logo.png";
import {
  HomeOutlined,
  CalendarOutlined,
  DollarOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const dropdownMenu = (
    <Menu>
      <Menu.Item key="hostPanel" onClick={() => navigate("/search")}>
        Host Panel
      </Menu.Item>
    </Menu>
  );

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
          justifyContent: "center",
        }}
        onClick={({ key }) => navigate(key)}
      >
        <Menu.Item
          key="/dashboard"
          icon={<HomeOutlined style={{ fontSize: "20px" }} />}
          style={{
            color: "white",
            fontSize: "18px",
            padding: "5px 24px",
          }}
        >
          Dashboard
        </Menu.Item>
        <Menu.Item
          key="/my_hotels"
          icon={<PlusOutlined style={{ fontSize: "20px" }} />}
          style={{
            color: "white",
            fontSize: "18px",
            padding: "5px 24px",
          }}
        >
          My Hotels
        </Menu.Item>
        <Menu.Item
          key="/host/reservations"
          icon={<CalendarOutlined style={{ fontSize: "20px" }} />}
          style={{
            color: "white",
            fontSize: "18px",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "5px",
            paddingBottom: "5px",
            marginBottom: "290px",

            justifyContent: "center",
          }}
        >
          Reservations
        </Menu.Item>
      </Menu>
      <Dropdown
        overlay={dropdownMenu}
        placement="bottomRight"
        trigger={["click"]}
      >
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Avatar
            size={80}
            icon={<AntDesignOutlined />}
            style={{ backgroundColor: "#FB8500" }}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default Sidebar;
