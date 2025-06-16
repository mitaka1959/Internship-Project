import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardChart from "./DashboardChart";
import RecentBookingsTable from "./RecentBookingsTable";
import Sidebar from "./sidebar/Sidebar";
import api from "../../../../../services/axios";

const Dashboard: React.FC = () => {
  const [statsData, setStatsData] = useState<any>(null);
  const [monthlyStats, setMonthlyStats] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/api/Hotels/dashboard");
        const data = response.data;

        const [reservedStr, capacityStr] = data.stats.totalReserved
          .split(" / ")
          .map((v: string) => parseInt(v));

        setStatsData({
          bookingCount: data.stats.newBookings,
          revenue: parseInt(data.stats.totalRevenue.replace(/[$,]/g, "")),
          reserved: reservedStr,
          capacity: capacityStr,
          changes: data.stats.changes,
        });

        setMonthlyStats(data.monthlyStats);
        setRecentBookings(data.recentBookings);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      }
    };

    fetchDashboardData();
  }, []);

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
      {statsData && (
        <DashboardStats
          bookingCount={statsData.bookingCount}
          revenue={statsData.revenue}
          reserved={statsData.reserved}
          capacity={statsData.capacity}
          changes={statsData.changes}
        />
      )}
      <DashboardChart monthlyStats={monthlyStats} />
      <RecentBookingsTable bookings={recentBookings} />
    </div>
  );
};

export default Dashboard;
