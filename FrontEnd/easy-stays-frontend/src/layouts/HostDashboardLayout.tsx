import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";

import {
  HomeOutlined,
  CalendarOutlined,
  DollarOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const HostDashboardLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div className="logo" style={{ color: "white", padding: "16px" }}>
          EasyStays
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}>
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="my-hotels" icon={<PlusOutlined />}>
            My Hotels
          </Menu.Item>
          <Menu.Item key="reservations" icon={<CalendarOutlined />}>
            Reservations
          </Menu.Item>
          <Menu.Item key="earnings" icon={<DollarOutlined />}>
            Earnings
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ padding: "24px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default HostDashboardLayout;
