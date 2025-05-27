import React, { useState } from "react";
import { Layout, Typography } from "antd";
import Sidebar from "../../sidebar/Sidebar";
import EditHotelSidebar from "./EditHotelSidebar";
import PropertyDetails from "../EditHotel/PropertyDetails";
import RoomSetup from "../EditHotel/RoomSetup";
import MediaPolicies from "../EditHotel/MediaPolicies";
import Sider from "antd/es/layout/Sider";

const { Content } = Layout;
const { Title } = Typography;

const EditHotel: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>("property");

  const renderSection = () => {
    switch (selectedSection) {
      case "property":
        return <PropertyDetails />;
      case "rooms":
        return <RoomSetup />;
      case "media":
        return <MediaPolicies />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Main Sidebar */}
      <Sider width={220} style={{ background: "#001529" }}>
        <Sidebar />
      </Sider>

      {/* Secondary Sidebar + Content */}
      <Layout style={{ margin: 0 }}>
        {" "}
        {/* Remove margin/padding here */}
        <Sider
          width={200}
          style={{
            background: "#f7f9fc",
            borderRight: "1px solid #e0e0e0",
            marginTop: "64px",
            boxShadow: "2px 0 5px rgba(0,0,0,0.05)",
            margin: 0, // remove any default margins
          }}
        >
          <EditHotelSidebar
            selectedSection={selectedSection}
            setSelectedSection={setSelectedSection}
          />
        </Sider>
        {/* Main Content */}
        <Layout style={{ margin: 0, padding: 0 }}>
          <Content
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Title level={3} style={{ marginBottom: "16px" }}>
              Edit Hotel
            </Title>
            {renderSection()}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default EditHotel;
