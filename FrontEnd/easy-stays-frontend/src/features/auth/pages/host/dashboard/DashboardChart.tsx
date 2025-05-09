import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, Typography } from "antd";

const { Title } = Typography;

const data = [
  { name: "Jan", visitors: 30 },
  { name: "Feb", visitors: 45 },
  { name: "Mar", visitors: 60 },
  { name: "Apr", visitors: 50 },
  { name: "May", visitors: 80 },
  { name: "Jun", visitors: 65 },
  { name: "Jul", visitors: 90 },
  { name: "Aug", visitors: 100 },
];

const DashboardChart: React.FC = () => {
  return (
    <Card style={{ marginBottom: "2rem", backgroundColor: "#ffffff" }}>
      <Title level={4} style={{ color: "#023047", marginBottom: 0 }}>
        Visitor Statistics
      </Title>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FB8500" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FB8500" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#FB8500"
            strokeWidth={3}
            fill="url(#colorVisitors)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default DashboardChart;
