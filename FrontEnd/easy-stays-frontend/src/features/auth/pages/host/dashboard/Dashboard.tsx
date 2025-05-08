import React from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardChart from "./DashboardChart";
import RecentBookingsTable from "./RecentBookingsTable";

const Dashboard: React.FC = () => {
  return (
    <div style={{ padding: "24px" }}>
      <DashboardHeader />
      <DashboardStats />
      <DashboardChart />
      <RecentBookingsTable />
    </div>
  );
};

export default Dashboard;
