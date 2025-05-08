import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const DashboardHeader: React.FC = () => {
  const userName = localStorage.getItem("userName");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <Title level={3} style={{ margin: 0, color: "#023047" }}>
        Welcome back, {userName}!
      </Title>
    </div>
  );
};

export default DashboardHeader;
