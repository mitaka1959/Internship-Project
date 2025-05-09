import React from "react";
import {
  LineChart,
  Line,
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
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#FB8500"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default DashboardChart;
