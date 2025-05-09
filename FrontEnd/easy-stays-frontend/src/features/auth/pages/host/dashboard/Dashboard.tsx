import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardChart from "./DashboardChart";
import RecentBookingsTable from "./RecentBookingsTable";
import Sidebar from "./sidebar/Sidebar";

const Dashboard: React.FC = () => {
  return (
    <div
      style={{
        marginLeft: "220px",
        padding: "1rem",
        backgroundColor: "#8ECAE6",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "0.2rem",
      }}
    >
      <Sidebar />
      <DashboardHeader />
      <DashboardStats />
      <DashboardChart />
      <RecentBookingsTable />
    </div>
  );
};

export default Dashboard;
