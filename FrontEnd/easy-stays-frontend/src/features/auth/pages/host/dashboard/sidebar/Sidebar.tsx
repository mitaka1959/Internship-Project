import { Menu, Divider, Card, Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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
        paddingTop: "1rem",
        color: "white",
        zIndex: 1000,
      }}
    >
      <Menu
        mode="vertical"
        theme="dark"
        style={{ backgroundColor: "#023047", color: "white" }}
        onClick={({ key }) => navigate(key)}
        items={[
          { label: "Dashboard", key: "/" },
          { label: "Reservations", key: "/reservations" },
          { label: "Analytics", key: "/analytics" },
          { label: "Customers", key: "/customers" },
        ]}
      />

      <Divider style={{ backgroundColor: "white" }} />

      <Menu
        mode="vertical"
        theme="dark"
        style={{ backgroundColor: "#023047", color: "white" }}
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
