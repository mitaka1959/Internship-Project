import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  CalendarOutlined,
  DollarOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo.png";

const { Sider, Content } = Layout;

const HostDashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={220}
        style={{
          backgroundColor: "#023047",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ padding: "5px 10px", textAlign: "center" }}>
          <img
            src={logo}
            alt="EasyStays Logo"
            style={{ width: "200px", height: "auto" }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/dashboard"]}
          onClick={({ key }) => navigate(key)}
          style={{ backgroundColor: "#023047" }}
        >
          <Menu.Item
            key="/dashboard"
            icon={<HomeOutlined />}
            style={{ color: "white" }}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="/my-hotels"
            icon={<PlusOutlined />}
            style={{ color: "white" }}
          >
            My Hotels
          </Menu.Item>
          <Menu.Item
            key="/reservations"
            icon={<CalendarOutlined />}
            style={{ color: "white" }}
          >
            Reservations
          </Menu.Item>
          <Menu.Item
            key="/earnings"
            icon={<DollarOutlined />}
            style={{ color: "white" }}
          >
            Earnings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 220 }}>
        <Content
          style={{
            padding: "10px",
            backgroundColor: "#8ECAE6",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HostDashboardLayout;
